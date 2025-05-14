function ttpx(x) {
    return x*32;
}

function createLevel1() {
    const map = [
        "=======================",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "=                     =",
        "======================="
    ];
    addLevel(map, levelConfig);

        // Create moving platform using the new component
        for (let i = 0; i < 11; i++) {
            createMovingPlatform(k, ttpx(i + 3), ttpx(i + 1));
        }

        // Add a spike
        createSpike(k, ttpx(3), ttpx(0));
    
        // Add a portal to level8
        createPortal(k, ttpx(5), ttpx(5), "level8");
}

// Register the level
registerLevel("level1", createLevel1);