import React, { useRef, useEffect, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { HERO_MODEL_SETTINGS } from '../config/modelSettings';
import './HeroModel.css';

/* ─────────────────────────────────────────────────────────────────
   GLB MODEL — only mounted after file existence is confirmed
───────────────────────────────────────────────────────────────── */
const GLBModel = ({ onLoaded }) => {
    const S = HERO_MODEL_SETTINGS.model;
    const meshRef = useRef();
    const mixerRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const { scene, animations } = useGLTF(S.modelPath);
    const clonedScene = React.useMemo(() => scene.clone(true), [scene]);

    useEffect(() => {
        if (animations?.length > 0) {
            const mixer = new THREE.AnimationMixer(clonedScene);
            const idx = Math.min(S.animationIndex, animations.length - 1);
            const action = mixer.clipAction(animations[idx]);
            action.timeScale = S.animationSpeed;
            action.play();
            mixerRef.current = mixer;
        }
        if (S.overrideMaterial) {
            clonedScene.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.color    = new THREE.Color(S.color);
                    child.material.emissive = new THREE.Color(S.emissive);
                    child.material.metalness = S.metalness;
                    child.material.roughness = S.roughness;
                    child.material.needsUpdate = true;
                }
            });
        }
        return () => mixerRef.current?.stopAllAction();
    }, [clonedScene, animations, S]);

    useEffect(() => {
        if (onLoaded) onLoaded();
    }, [onLoaded]);

    useFrame(() => {
        const dt = clockRef.current.getDelta();
        mixerRef.current?.update(dt);
        if (!meshRef.current) return;
        const t = performance.now() * 0.001;
        if (S.idleFloat) {
            meshRef.current.position.y =
                S.y + Math.sin(t * S.idleFloatSpeed) * S.idleFloatAmount;
        }
        if (S.idleRotAmount > 0) {
            meshRef.current.rotation.y += S.idleRotAmount;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={clonedScene}
            scale={S.scale}
            position={[S.x, S.y, S.z]}
            rotation={[S.rotX, S.rotY, S.rotZ]}
            castShadow
            receiveShadow
        />
    );
};

/* ─────────────────────────────────────────────────────────────────
   FALLBACK — golden spinning octahedron (shown while loading or
   if no GLB placed yet)
───────────────────────────────────────────────────────────────── */
const FallbackModel = () => {
    const meshRef = useRef();
    useFrame(() => {
        if (!meshRef.current) return;
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.x = Math.sin(performance.now() * 0.0005) * 0.2;
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
   LIGHTS
───────────────────────────────────────────────────────────────── */
const SceneLighting = () => {
    const L = HERO_MODEL_SETTINGS.lighting;
    return (
        <>
            <ambientLight intensity={L.ambientIntensity} color={L.ambientColor} />
            <spotLight
                intensity={L.spotIntensity} color={L.spotColor}
                position={[L.spotX, L.spotY, L.spotZ]}
                angle={L.spotAngle} penumbra={L.spotPenumbra} castShadow
            />
            <pointLight intensity={L.fillIntensity} color={L.fillColor}
                position={[L.fillX, L.fillY, L.fillZ]} />
            <pointLight intensity={L.rimIntensity} color={L.rimColor}
                position={[L.rimX, L.rimY, L.rimZ]} />
        </>
    );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE CONTENT — switches between GLB and fallback based on
   whether the file was successfully fetched
───────────────────────────────────────────────────────────────── */
const SceneContent = ({ modelReady, onModelLoaded }) => {
    if (modelReady) {
        return (
            <Suspense fallback={<FallbackModel />}>
                <GLBModel onLoaded={onModelLoaded} />
            </Suspense>
        );
    }
    return <FallbackModel />;
};

/* ─────────────────────────────────────────────────────────────────
   LOADING SPINNER
───────────────────────────────────────────────────────────────── */
const LoadingSpinner = () => (
    <div className="hero-model__loading">
        <div className="hero-model__spinner" />
        <span>Loading model…</span>
    </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
const HeroModel = ({ onModelLoaded }) => {
    const S = HERO_MODEL_SETTINGS;
    const C = S.camera;
    const Ctrl = S.controls;
    const Env = S.environment;
    const Cv = S.canvas;

    // Check file exists before attempting useGLTF (avoids uncaught crash)
    const [modelReady, setModelReady] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        fetch(S.model.modelPath, { method: 'HEAD' })
            .then(res => { 
                setModelReady(res.ok);
                if (!res.ok && onModelLoaded) onModelLoaded();
            })
            .catch(() => { 
                setModelReady(false);
                if (onModelLoaded) onModelLoaded();
            })
            .finally(() => setChecking(false));
    }, [S.model.modelPath, onModelLoaded]);

    return (
        <div className="hero-model__wrap">
            {checking ? (
                <LoadingSpinner />
            ) : (
                <Canvas
                    shadows={Cv.shadows}
                    gl={{
                        antialias: Cv.antialias,
                        alpha: Cv.alpha,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: Cv.toneMappingExposure,
                    }}
                    camera={{ fov: C.fov, position: [C.x, C.y, C.z], near: 0.1, far: 100 }}
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
                    <SceneContent modelReady={modelReady} onModelLoaded={onModelLoaded} />
                </Canvas>
            )}

            {!checking && (
                <div className="hero-model__hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2">
                        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m0 0V3a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/>
                        <path d="M6 14v0a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2.5"/>
                    </svg>
                    Drag to rotate
                </div>
            )}
        </div>
    );
};

export default HeroModel;
