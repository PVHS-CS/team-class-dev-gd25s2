// Initialize Kaplay
const k = kaboom({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: false,
    pixelDensity: 1, // avoid dbl on highrez screens
    hashGridSize: 64,
});

// Load sprites
k.loadSprite("floor", "sprites/skuller.png");
k.loadSprite("coin", "sprites/egg.png");
k.loadSprite("spike", "sprites/watermelon.png");
k.loadSprite("special", "sprites/bag.png");

// Set gravity
k.setGravity(1000);

// Wait for all scripts to load before starting
window.addEventListener('load', () => {
    console.log("All scripts loaded, initializing game...");
    // Give a small delay to ensure all scripts have executed
    setTimeout(initGame, 100);
}); 