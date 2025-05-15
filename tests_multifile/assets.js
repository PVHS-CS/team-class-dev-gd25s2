// Asset manifest - all game assets defined in one place
const ASSETS = {
    sprites: {
        x: {
            path: "https://images.squarespace-cdn.com/content/v1/607f89e638219e13eee71b1e/1684821560422-SD5V37BAG28BURTLIXUQ/michael-sum-LEpfefQf4rU-unsplash.jpg?format=2500w",
            options: {}
        },
        floor: {
            path: "./sprites/skuller.png",
            options: {}
        },
        coin: {
            path: "./sprites/egg.png",
            options: {}
        },
        spike: {
            path: "./sprites/watermelon.png",
            options: {}
        },
        special: {
            path: "./sprites/bag.png",
            options: {}
        },
        orange: {
            path: "./sprites/orange.png",
            options: {
                sliceX: 2,
                sliceY: 2,
                anims: {
                    idle: {
                        from: 0,
                        to: 0,
                    },
                    walk: {
                        from: 1,
                        to: 3,
                        loop: true,
                    },
                },
            }
        }
    },
    // Add more asset types here as needed (audio, fonts, etc.)
    audio: {},
    fonts: {}
};

// Loading screen scene
function createLoadingScene(k) {
    let progressText;
    let progressBar;
    
    k.scene("loading", () => {
        // Center position calculations
        const centerX = k.width() / 2;
        const centerY = k.height() / 2;

        // Loading text
        k.add([
            k.text("Loading...", { size: 32 }),
            k.pos(centerX, centerY - 40),
            k.anchor("center")
        ]);

        // Progress text
        progressText = k.add([
            k.text("0%", { size: 24 }),
            k.pos(centerX, centerY + 10),
            k.anchor("center")
        ]);

        // Loading bar background
        const barWidth = 200;
        const barHeight = 20;
        const barX = centerX - barWidth / 2;
        const barY = centerY + 50;

        k.add([
            k.rect(barWidth, barHeight),
            k.pos(barX, barY),
            k.color(0.2, 0.2, 0.2)
        ]);

        progressBar = k.add([
            k.rect(0, barHeight),
            k.pos(barX, barY),
            k.color(0, 0.8, 0)
        ]);
    });

    return {
        updateProgress: (progress) => {
            if (progressText && progressBar) {
                progressText.text = `${Math.floor(progress * 100)}%`;
                progressBar.width = 200 * progress;
            }
        }
    };
}

// Asset loading functions
function loadAllAssets(k) {
    console.log("Loading game assets...");
    
    // Load all sprites
    Object.entries(ASSETS.sprites).forEach(([name, asset]) => {
        k.loadSprite(name, asset.path, asset.options);
    });

    // Load all audio
    Object.entries(ASSETS.audio).forEach(([name, asset]) => {
        k.loadSound(name, asset.path);
    });

    // Load all fonts
    Object.entries(ASSETS.fonts).forEach(([name, asset]) => {
        k.loadFont(name, asset.path);
    });
}

// Asset preloader with error handling and loading screen
function preloadAssets(k) {
    return new Promise((resolve, reject) => {
        const totalAssets = 
            Object.keys(ASSETS.sprites).length + 
            Object.keys(ASSETS.audio).length + 
            Object.keys(ASSETS.fonts).length;
        
        if (totalAssets === 0) {
            console.warn("No assets to load!");
            resolve();
            return;
        }

        let loadedAssets = 0;
        let failedAssets = [];
        
        // Create loading scene and get its update function
        const loadingScene = createLoadingScene(k);
        k.go("loading");

        const onLoad = () => {
            loadedAssets++;
            const progress = loadedAssets / totalAssets;
            loadingScene.updateProgress(progress);

            if (loadedAssets + failedAssets.length === totalAssets) {
                if (failedAssets.length > 0) {
                    console.error("Failed to load assets:", failedAssets);
                    reject(new Error(`Failed to load assets: ${failedAssets.join(", ")}`));
                } else {
                    console.log("All assets loaded successfully!");
                    resolve();
                }
            }
        };

        const onError = (name, error) => {
            console.error(`Failed to load asset ${name}:`, error);
            failedAssets.push(name);
            onLoad(); // Count failed assets in progress
        };

        // Add load handlers for each asset type
        Object.entries(ASSETS.sprites).forEach(([name, asset]) => {
            try {
                k.loadSprite(name, asset.path, {
                    ...asset.options,
                    onLoad,
                    onError: (error) => onError(name, error)
                });
            } catch (error) {
                onError(name, error);
            }
        });

        Object.entries(ASSETS.audio).forEach(([name, asset]) => {
            try {
                k.loadSound(name, asset.path, { 
                    onLoad,
                    onError: (error) => onError(name, error)
                });
            } catch (error) {
                onError(name, error);
            }
        });

        Object.entries(ASSETS.fonts).forEach(([name, asset]) => {
            try {
                k.loadFont(name, asset.path, { 
                    onLoad,
                    onError: (error) => onError(name, error)
                });
            } catch (error) {
                onError(name, error);
            }
        });
    });
}

// Export the asset management functions
window.assetManager = {
    loadAllAssets,
    preloadAssets,
    ASSETS
}; 