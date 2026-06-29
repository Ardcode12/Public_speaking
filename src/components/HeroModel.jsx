import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_MODEL_SETTINGS } from '../config/modelSettings';
import './HeroModel.css';

/* ─────────────────────────────────────────────────────────────────
   INNER: The actual loaded GLB model
───────────────────────────────────────────────────────────────── */
const GLBModel = () => {
    const S = HERO_MODEL_SETTINGS;
    const m = S.model;
    const meshRef = useRef();
    const mixerRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const { scene, animations } = useGLTF(m.modelPath);

    // Clone scene so multiple instances don't share state
    const clonedScene = React.useMemo(() => scene.clone(true), [scene]);

    // Apply animation if available
    useEffect(() => {
        if (animations && animations.length > 0) {
            const mixer = new THREE.AnimationMixer(clonedScene);
            const idx = Math.min(m.animationIndex, animations.length - 1);
            const action = mixer.clipAction(animations[idx]);
            action.timeScale = m.animationSpeed;
            action.play();
            mixerRef.current = mixer;
        }

        // Optional material override
        if (m.overrideMaterial) {
            clonedScene.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.color = new THREE.Color(m.color);
                    child.material.emissive = new THREE.Color(m.emissive);
                    child.material.metalness = m.metalness;
                    child.material.roughness = m.roughness;
                    child.material.needsUpdate = true;
                }
            });
        }

        return () => mixerRef.current?.stopAllAction();
    }, [clonedScene, animations, m]);

    // Per-frame: animation mixer + idle float + idle rotation
    useFrame(() => {
        const dt = clockRef.current.getDelta();
        mixerRef.current?.update(dt);

        if (!meshRef.current) return;
        const t = performance.now() * 0.001;

        if (m.idleFloat) {
            meshRef.current.position.y =
                m.y + Math.sin(t * m.idleFloatSpeed) * m.idleFloatAmount;
        }
        if (m.idleRotAmount > 0) {
            meshRef.current.rotation.y += m.idleRotAmount;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={clonedScene}
            scale={m.scale}
            position={[m.x, m.y, m.z]}
            rotation={[m.rotX, m.rotY, m.rotZ]}
            castShadow
            receiveShadow
        />
    );
};

/* ─────────────────────────────────────────────────────────────────
   FALLBACK: Shown while model loads (or if no GLB placed yet)
───────────────────────────────────────────────────────────────── */
const FallbackModel = () => {
    const meshRef = useRef();
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.008;
            meshRef.current.rotation.x = Math.sin(performance.now() * 0.0005) * 0.2;
        }
    });
    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <octahedronGeometry args={[1.4, 0]} />
            <meshStandardMaterial
                color="#EDB927"
                metalness={0.9}
                roughness={0.1}
                emissive="#3a2800"
                emissiveIntensity={0.4}
            />
        </mesh>
    );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE LIGHTING — driven entirely by modelSettings.js
───────────────────────────────────────────────────────────────── */
const SceneLighting = () => {
    const L = HERO_MODEL_SETTINGS.lighting;
    return (
        <>
            <ambientLight intensity={L.ambientIntensity} color={L.ambientColor} />
            <spotLight
                intensity={L.spotIntensity}
                color={L.spotColor}
                position={[L.spotX, L.spotY, L.spotZ]}
                angle={L.spotAngle}
                penumbra={L.spotPenumbra}
                castShadow
            />
            <pointLight
                intensity={L.fillIntensity}
                color={L.fillColor}
                position={[L.fillX, L.fillY, L.fillZ]}
            />
            <pointLight
                intensity={L.rimIntensity}
                color={L.rimColor}
                position={[L.rimX, L.rimY, L.rimZ]}
            />
        </>
    );
};

/* ─────────────────────────────────────────────────────────────────
   ERROR BOUNDARY — catches missing GLB file gracefully
───────────────────────────────────────────────────────────────── */
class ModelErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    render() {
        if (this.state.hasError) return this.props.fallback;
        return this.props.children;
    }
}

/* ─────────────────────────────────────────────────────────────────
   LOADING SPINNER (Suspense fallback)
───────────────────────────────────────────────────────────────── */
const LoadingSpinner = () => (
    <div className="hero-model__loading">
        <div className="hero-model__spinner" />
        <span>Loading model…</span>
    </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT: HeroModel Canvas
───────────────────────────────────────────────────────────────── */
const HeroModel = () => {
    const S = HERO_MODEL_SETTINGS;
    const C = S.camera;
    const Ctrl = S.controls;
    const Env = S.environment;
    const Cv = S.canvas;

    return (
        <div className="hero-model__wrap">
            <Suspense fallback={<LoadingSpinner />}>
                <Canvas
                    shadows={Cv.shadows}
                    gl={{
                        antialias: Cv.antialias,
                        alpha: Cv.alpha,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: Cv.toneMappingExposure,
                    }}
                    camera={{
                        fov: C.fov,
                        position: [C.x, C.y, C.z],
                        near: 0.1,
                        far: 100,
                    }}
                    style={{ background: 'transparent' }}
                >
                    <SceneLighting />

                    <Environment preset={Env.preset} background={Env.background} blur={Env.blur} />

                    <OrbitControls
                        enabled={Ctrl.orbitEnabled}
                        enableZoom={Ctrl.zoomEnabled}
                        enablePan={Ctrl.panEnabled}
                        autoRotate={Ctrl.autoRotate}
                        autoRotateSpeed={Ctrl.autoRotateSpeed}
                        minPolarAngle={Ctrl.minPolarAngle}
                        maxPolarAngle={Ctrl.maxPolarAngle}
                        enableDamping
                        dampingFactor={Ctrl.dampingFactor}
                    />

                    <ModelErrorBoundary fallback={<FallbackModel />}>
                        <Suspense fallback={null}>
                            <GLBModel />
                        </Suspense>
                    </ModelErrorBoundary>
                </Canvas>
            </Suspense>

            {/* Drag hint */}
            <div className="hero-model__hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m0 0V3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/>
                    <path d="M6 14v0a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2.5"/>
                </svg>
                Drag to rotate
            </div>
        </div>
    );
};

export default HeroModel;
