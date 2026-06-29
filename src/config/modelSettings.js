// ╔══════════════════════════════════════════════════════════════════════╗
// ║   🎤 VOICEFORWARD — HERO 3D MODEL SETTINGS                          ║
// ║                                                                      ║
// ║   HOW TO USE:                                                        ║
// ║   • Drop your .glb file into /public/models/                        ║
// ║   • Set modelPath below to match the filename                        ║
// ║   • Save this file → browser hot-reloads instantly                  ║
// ║   • Adjust numbers and watch the model move live                     ║
// ╚══════════════════════════════════════════════════════════════════════╝

export const HERO_MODEL_SETTINGS = {

    // ══════════════════════════════════════════════════════════════════
    // 📦 MODEL FILE
    // ══════════════════════════════════════════════════════════════════
    model: {
        modelPath: '/models/microfono_vintage.glb',   // ← Change this to your .glb filename

        // ── TRANSFORM ─────────────────────────────────────────────
        scale:  0.27,    // Size multiplier (1 = original size)
        x:     -0.12,    // Left (-) / Right (+)
        y:     -3.0,    // Down (-) / Up (+)
        z:      0.0,    // Forward (+) / Back (-)

        // ── MOBILE OVERRIDES ──────────────────────────────────────
        // Use these to adjust size/position ONLY on phones (keeps desktop safe)
        mobileScale: 0.28,   // Larger on mobile
        mobileX:     0.0,    // Centered on mobile
        mobileY:    -3.4,    // Lowered slightly
        mobileZ:     0.0,

        // ── ROTATION (radians: Math.PI = 180°) ────────────────────
        rotX:   0,              // Tilt forward/back
        rotY:   0,              // Spin left/right  ← most useful
        rotZ:   0,              // Lean sideways

        // ── ANIMATION ─────────────────────────────────────────────
        animationIndex: 0,      // Which built-in animation to play (0 = first)
        animationSpeed: 1.0,    // Playback speed multiplier

        // ── IDLE FLOATING ─────────────────────────────────────────
        idleFloat:       false,  // Enable subtle up/down float
        idleFloatSpeed:  0.8,   // Float oscillation speed
        idleFloatAmount: 0.12,  // How far it floats (units)
        idleRotSpeed:    0.03,   // Auto-spin speed (0 = off)
        idleRotAmount:   0.007,   // Degrees per frame for auto-spin

        // ── MATERIAL OVERRIDES ────────────────────────────────────
        overrideMaterial: false, // Set true to apply tint/emissive below
        color:    0xffffff,      // Base tint colour (hex)
        emissive: 0x1a0a00,      // Glow/dark shade colour (hex)
        metalness: 0.4,          // 0 = plastic, 1 = full metal
        roughness: 0.5,          // 0 = mirror, 1 = matte
    },

    // ══════════════════════════════════════════════════════════════════
    // 👩 WOMAN MODEL (green student)
    // ══════════════════════════════════════════════════════════════════
    womanModel: {
        enabled: false,   // ← set false to hide the green girl

        modelPath: '/models/man.glb',

        // ── TRANSFORM ─────────────────────────────────────────────
        scale:  2.4,    // Size multiplier
        x:      0.4,    // Positioned to the right of the mike
        y:     -2.2,    // Ground level
        z:      -1,

        // ── MOBILE OVERRIDES ──────────────────────────────────────
        mobileScale: 2.6,
        mobileX:     0.0,
        mobileY:    -2.2,
        mobileZ:     -1,

        // ── ROTATION ──────────────────────────────────────────────
        rotX:   0,
        rotY:  -1.0,    // Slightly turned toward center
        rotZ:   0,

        // ── ANIMATION ─────────────────────────────────────────────
        animationIndex: 0,
        animationSpeed: 1.0,

        // ── IDLE FLOATING ─────────────────────────────────────────
        idleFloat:       false,
        idleFloatSpeed:  0.6,
        idleFloatAmount: 0.08,
        idleRotAmount:   0.0,

        // ── MATERIAL OVERRIDES ────────────────────────────────────
        // Set true ONLY if the model has no textures and you want to paint it a solid color.
        // Keep false to preserve the model's own baked-in colors/textures.
        overrideMaterial: false,
        color:    0xc8a882,
        emissive: 0x1a0800,
        metalness: 0.1,
        roughness: 0.6,
    },

    // ══════════════════════════════════════════════════════════════════
    // 📷 CAMERA
    // ══════════════════════════════════════════════════════════════════
    camera: {
        fov:  45,   // Field of view (degrees) — higher = wider lens
        x:    0,    // Camera X offset
        y:    0.5,  // Camera Y offset (lift up slightly)
        z:    5.5,  // Distance from model (pull back for bigger scene)
        
        mobileZ: 5.5, // Distance on mobile
    },

    // ══════════════════════════════════════════════════════════════════
    // 💡 LIGHTING
    // ══════════════════════════════════════════════════════════════════
    lighting: {
        ambientIntensity:   0.7,   // Overall brightness (0–3)
        ambientColor:       0xffffff,

        spotIntensity:      1.8,   // Main spot light strength
        spotColor:          0xEDB927,  // Spot colour → yellow accent!
        spotX:              3,
        spotY:              5,
        spotZ:              3,
        spotAngle:          0.4,
        spotPenumbra:       0.6,

        fillIntensity:      0.5,   // Soft fill light (opposite side)
        fillColor:          0x404060,
        fillX:             -3,
        fillY:              2,
        fillZ:             -3,

        rimIntensity:       0.8,   // Back-rim / outline glow
        rimColor:           0xEDB927,
        rimX:               0,
        rimY:               3,
        rimZ:              -4,
    },

    // ══════════════════════════════════════════════════════════════════
    // 🎮 INTERACTION
    // ══════════════════════════════════════════════════════════════════
    controls: {
        orbitEnabled:  true,   // Allow mouse drag to rotate
        zoomEnabled:   false,  // Allow scroll to zoom
        panEnabled:    false,  // Allow pan (usually off)
        autoRotate:    false,  // Constant auto-rotation
        autoRotateSpeed: 1.5,  // Speed if autoRotate = true
        minPolarAngle: 0.5,    // Vertical limit (top)
        maxPolarAngle: 2.2,    // Vertical limit (bottom)
        dampingFactor: 0.08,   // Mouse drag smoothness
    },

    // ══════════════════════════════════════════════════════════════════
    // 🌍 ENVIRONMENT / BACKGROUND
    // ══════════════════════════════════════════════════════════════════
    environment: {
        preset: 'city',     // HDR env: 'city' | 'sunset' | 'dawn' | 'night' | 'warehouse' | 'forest' | 'apartment' | 'studio' | 'park' | 'lobby'
        background: false,  // Show env as actual background?
        blur: 0.6,          // Env background blur amount
    },

    // ══════════════════════════════════════════════════════════════════
    // 🎨 CANVAS / RENDERER
    // ══════════════════════════════════════════════════════════════════
    canvas: {
        shadows:        true,
        antialias:      true,
        alpha:          true,   // Transparent canvas bg (keeps section bg visible)
        toneMapping:    'ACESFilmic', // 'ACESFilmic' | 'Linear' | 'Cineon' | 'Reinhard'
        toneMappingExposure: 1.1,
    },
};
