// Initialize Kaplay
const k = kaboom({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true,
    pixelDensity: 1, // avoid dbl on highrez screens
    hashGridSize: 64,
});

// Load sprites
// https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w
// k.loadSprite("floor", "sprites/skuller.png");
// k.loadSprite("coin", "sprites/egg.png");
// k.loadSprite("spike", "sprites/watermelon.png");
// k.loadSprite("special", "sprites/bag.png");
// k.loadSprite("orange", "sprites/orange.png", {
//     sliceX: 2,
//     sliceY: 2,
//     anims: {
//         idle: {
//             from: 0,
//             to: 0,
//         },
//         walk: {
//             from: 1,
//             to: 3,
//             loop: true,
//         },
//     },
// });

// Set gravity
k.setGravity(1000);

// Error scene
k.scene("error", (errorMessage) => {
    const centerX = k.width() / 2;
    const centerY = k.height() / 2;

    k.add([
        k.text("Error Loading Assets", { size: 32 }),
        k.pos(centerX, centerY - 50),
        k.anchor("center"),
        k.color(1, 0, 0)
    ]);

    k.add([
        k.text(errorMessage, { size: 24 }),
        k.pos(centerX, centerY),
        k.anchor("center"),
        k.color(1, 1, 1)
    ]);

    k.add([
        k.text("Press R to retry", { size: 20 }),
        k.pos(centerX, centerY + 50),
        k.anchor("center"),
        k.color(0.7, 0.7, 0.7)
    ]);

    k.onKeyPress("r", () => {
        window.location.reload();
    });
});

// Start with loading scene and initialize game
window.assetManager.preloadAssets(k)
    .then(() => {
        console.log("All assets loaded successfully!");
        if (typeof initGame === 'function') {
            initGame();
        } else {
            console.error("initGame function not found!");
            k.go("error", "Game initialization failed: initGame function not found");
        }
    })
    .catch((error) => {
        console.error("Failed to load assets:", error);
        k.go("error", error.message);
    }); 