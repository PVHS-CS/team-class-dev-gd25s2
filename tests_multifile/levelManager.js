// Global level management
window.gameLevels = [];
let gameInitialized = false;

// Helper function to register a level
function registerLevel(name, createLevelFn) {
    console.log("Registering level:", name);
    
    // Add to global levels array
    window.gameLevels.push({
        name: name,
        create: createLevelFn
    });

    // Create the scene
    k.scene(name, async () => {
        // Wait for all sprites to be loaded
        await Promise.all(
            Object.keys(window.assetManager.ASSETS.sprites).map(spriteName => 
                new Promise(resolve => {
                    const sprite = k.getSprite(spriteName);
                    if (sprite && sprite.loaded) {
                        resolve();
                    } else {
                        // Use onLoad event instead of onSpriteLoad
                        k.onLoad(() => {
                            const sprite = k.getSprite(spriteName);
                            if (sprite && sprite.loaded) {
                                resolve();
                            }
                        });
                    }
                })
            )
        );

        const player = createPlayer(k);
        setupPlayerControls(k, player);
        const level = createLevelFn(k);
        k.onKeyPress("p", goToNextLevel);
        player.onUpdate(() => {
            k.setCamPos(player.pos);
        });
    });

    // If this is the first level and game hasn't started, start it
    if (!gameInitialized && window.gameLevels.length > 0) {
        gameInitialized = true;
        console.log("Starting game with level:", name);
        k.go(name);
    }
}

// Level management
let currentLevelIndex = 0;

function goToNextLevel() {
    currentLevelIndex = (currentLevelIndex + 1) % window.gameLevels.length;
    console.log("Switching to:", window.gameLevels[currentLevelIndex].name);
    k.go(window.gameLevels[currentLevelIndex].name);
}

// Initialize the game after all levels are loaded
function initGame() {
    if (window.gameLevels.length > 0 && !gameInitialized) {
        gameInitialized = true;
        console.log("Starting game with first level");
        k.go(window.gameLevels[0].name);
    } else {
        console.log("Waiting for levels to register...");
    }
} 