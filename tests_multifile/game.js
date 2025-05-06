// Initialize Kaplay
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true
});

// Set gravity
k.setGravity(1000);

// Level management
const levels = ["level1", "level2", "level3", "level4", "level5"];
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
});

k.scene("level2", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel2(k);
    k.onKeyPress("p", goToNextLevel);
});

k.scene("level3", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel3(k);
    k.onKeyPress("p", goToNextLevel);
});

k.scene("level4", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel4(k);
    k.onKeyPress("p", goToNextLevel);
});

k.scene("level5", () => {
    const player = createPlayer(k);
    setupPlayerControls(k, player);
    createLevel5(k);
    k.onKeyPress("p", goToNextLevel);
});

// Start with level 1
k.go("level1"); 