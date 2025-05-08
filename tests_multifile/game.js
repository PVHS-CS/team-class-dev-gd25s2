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

// Level management
const levels = ["level1", "level2", "level3", "level4", "level5", "level6", "level7", "level8"];
let currentLevelIndex = 0;

function goToNextLevel() {
    currentLevelIndex = (currentLevelIndex + 1) % levels.length;
    console.log("Switching to:", levels[currentLevelIndex]);
    k.go(levels[currentLevelIndex]);
}

// Create scenes for each level
k.scene("level1", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel1(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level2", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel2(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level3", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel3(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level4", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel4(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level5", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel5(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level6", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel6(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});

k.scene("level7", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel7(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});


k.scene("level8", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel8(k);
    k.onKeyPress("p", goToNextLevel);
    player.onUpdate(() => {
        k.setCamPos(player.pos);
    });
});
// Start with level 1
k.go("level1"); 