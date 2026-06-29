import React, { useRef, useEffect, Suspense, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils';
import * as THREE from 'three';
import { HERO_MODEL_SETTINGS } from '../config/modelSettings';
import './HeroModel.css';

/* ─────────────────────────────────────────────────────────────────
   MOBILE DETECTION HOOK
   Detects phone/tablet so we can strip expensive GPU features
───────────────────────────────────────────────────────────────── */
const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handler, { passive: true });
        return () => window.removeEventListener('resize', handler);
    }, []);
    return isMobile;
};

/* ─────────────────────────────────────────────────────────────────
   GENERIC GLB MODEL — driven entirely by a settings object (S)
───────────────────────────────────────────────────────────────── */
const GLBModel = ({ settings: S, onLoaded, isMobile }) => {
    const meshRef  = useRef();
    const mixerRef = useRef();
    const clockRef = useRef(new THREE.Clock());

    const { scene, animations } = useGLTF(S.modelPath);
    // SkeletonUtils.clone properly deep-clones skinned meshes + skeleton
    // bones — scene.clone(true) breaks skeleton bindings so animations won't play
    const clonedScene = React.useMemo(() => cloneSkeleton(scene), [scene]);

    useEffect(() => {
        if (animations?.length > 0) {
            const mixer  = new THREE.AnimationMixer(clonedScene);
            const idx    = Math.min(S.animationIndex, animations.length - 1);
            const action = mixer.clipAction(animations[idx]);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.timeScale = S.animationSpeed;
            action.reset();
            action.play();
            mixerRef.current = mixer;
        }
        if (S.overrideMaterial) {
            clonedScene.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.color     = new THREE.Color(S.color);
                    child.material.emissive  = new THREE.Color(S.emissive);
                    child.material.metalness = S.metalness;
                    child.material.roughness = S.roughness;
                    child.material.needsUpdate = true;
                }
            });
        }
        return () => mixerRef.current?.stopAllAction();
    }, [clonedScene, animations, S]);

    useEffect(() => { if (onLoaded) onLoaded(); }, [onLoaded]);

    // Fallback to desktop values if mobile values aren't set
    const currentScale = isMobile ? (S.mobileScale ?? S.scale) : S.scale;
    const currentX = isMobile ? (S.mobileX ?? S.x) : S.x;
    const currentY = isMobile ? (S.mobileY ?? S.y) : S.y;
    const currentZ = isMobile ? (S.mobileZ ?? S.z) : S.z;

    useFrame(() => {
        const dt = clockRef.current.getDelta();
        mixerRef.current?.update(dt);
        if (!meshRef.current) return;
        const t = performance.now() * 0.001;
        if (S.idleFloat) {
            meshRef.current.position.y =
                currentY + Math.sin(t * S.idleFloatSpeed) * S.idleFloatAmount;
        }
        if (S.idleRotAmount > 0) {
            meshRef.current.rotation.y += S.idleRotAmount;
        }
    });

    return (
        <primitive
            ref={meshRef}
            object={clonedScene}
            scale={currentScale}
            position={[currentX, currentY, currentZ]}
            rotation={[S.rotX, S.rotY, S.rotZ]}
            // Shadows disabled on mobile — expensive on mobile GPUs
            castShadow={!isMobile}
            receiveShadow={!isMobile}
        />
    );
};

/* ─────────────────────────────────────────────────────────────────
   FALLBACK — golden spinning octahedron
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
   LIGHTS — mobile uses cheaper 2-light setup
───────────────────────────────────────────────────────────────── */
const SceneLighting = ({ isMobile }) => {
    const L = HERO_MODEL_SETTINGS.lighting;
    if (isMobile) {
        // Mobile: stronger ambient so PBR materials aren't dark, fewer shadow lights
        return (
            <>
                <ambientLight intensity={2.0} color={L.ambientColor} />
                <pointLight intensity={2.0} color={L.spotColor} position={[2, 4, 3]} />
                <pointLight intensity={1.0} color={L.rimColor}  position={[-2, 1, -3]} />
                <pointLight intensity={0.8} color={0xffffff}    position={[0, 2, 4]} />
            </>
        );
    }
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
            <pointLight intensity={0.6} color={0x80ffb0} position={[3, 2, 2]} />
        </>
    );
};

/* ─────────────────────────────────────────────────────────────────
   SCENE CONTENT
───────────────────────────────────────────────────────────────── */
const SceneContent = ({ mikeReady, womanReady, onModelLoaded, isMobile }) => {
    return (
        <>
            {mikeReady ? (
                <Suspense fallback={<FallbackModel />}>
                    <GLBModel
                        settings={HERO_MODEL_SETTINGS.model}
                        onLoaded={onModelLoaded}
                        isMobile={isMobile}
                    />
                </Suspense>
            ) : (
                <FallbackModel />
            )}
            {womanReady && HERO_MODEL_SETTINGS.womanModel.enabled && (
                <Suspense fallback={null}>
                    <GLBModel
                        settings={HERO_MODEL_SETTINGS.womanModel}
                        isMobile={isMobile}
                    />
                </Suspense>
            )}
        </>
    );
};

/* ─────────────────────────────────────────────────────────────────
   LOADING SPINNER
───────────────────────────────────────────────────────────────── */
const LoadingSpinner = () => (
    <div className="hero-model__loading">
        <div className="hero-model__spinner" />
        <span>Loading…</span>
    </div>
);

/* ─────────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────────── */
const HeroModel = ({ onModelLoaded }) => {
    const S    = HERO_MODEL_SETTINGS;
    const C    = S.camera;
    const Ctrl = S.controls;
    const Env  = S.environment;
    const Cv   = S.canvas;

    const isMobile = useIsMobile();

    const [mikeReady,  setMikeReady]  = useState(false);
    const [womanReady, setWomanReady] = useState(false);
    const [checking,   setChecking]   = useState(true);

    const handleModelLoaded = useCallback(() => {
        if (onModelLoaded) onModelLoaded();
    }, [onModelLoaded]);

    useEffect(() => {
        let resolved = 0;
        const total  = S.womanModel.enabled ? 2 : 1;
        const done   = () => { resolved++; if (resolved === total) setChecking(false); };

        fetch(S.model.modelPath, { method: 'HEAD' })
            .then(res => { setMikeReady(res.ok); if (!res.ok) handleModelLoaded(); })
            .catch(() => { setMikeReady(false); handleModelLoaded(); })
            .finally(done);

        if (S.womanModel.enabled) {
            fetch(S.womanModel.modelPath, { method: 'HEAD' })
                .then(res => setWomanReady(res.ok))
                .catch(() => setWomanReady(false))
                .finally(done);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Mobile renderer config — strips expensive features to save VRAM/battery
    const glConfig = isMobile
        ? {
            antialias:           false,   // no MSAA on mobile
            alpha:               true,
            toneMapping:         THREE.LinearToneMapping,
            toneMappingExposure: 1.0,
            powerPreference:     'low-power',
          }
        : {
            antialias:           Cv.antialias,
            alpha:               Cv.alpha,
            toneMapping:         THREE.ACESFilmicToneMapping,
            toneMappingExposure: Cv.toneMappingExposure,
            powerPreference:     'high-performance',
          };

    return (
        <div className="hero-model__wrap">
            {checking ? (
                <LoadingSpinner />
            ) : (
                <Canvas
                    // dpr caps device pixel ratio — mobile at 3× DPR = 9× pixels, capped to 1.5×
                    dpr={isMobile ? [1, 1.5] : [1, 2]}
                    // Shadows disabled entirely on mobile
                    shadows={isMobile ? false : Cv.shadows}
                    gl={glConfig}
                    // Uses mobileZ if available
                    camera={{ fov: C.fov, position: [C.x, C.y, isMobile ? (C.mobileZ ?? C.z) : C.z], near: 0.1, far: 100 }}
                    style={{ background: 'transparent' }}
                    frameloop="always"
                >
                    <SceneLighting isMobile={isMobile} />

                    {/* Mobile uses lighter 'sunset' preset; desktop uses 'city' */}
                    <Environment
                        preset={isMobile ? 'sunset' : Env.preset}
                        background={Env.background}
                        blur={Env.blur}
                    />

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
                        // On mobile touching the model triggers orbit — allow page scroll too
                        touches={{ ONE: isMobile ? 2 : 1, TWO: 0 }}
                    />

                    <SceneContent
                        mikeReady={mikeReady}
                        womanReady={womanReady}
                        onModelLoaded={handleModelLoaded}
                        isMobile={isMobile}
                    />
                </Canvas>
            )}
        </div>
    );
};

export default HeroModel;
