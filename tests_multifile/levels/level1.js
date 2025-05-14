function createLevel1() {
    const map = [
        "==========",
        "=        =",
        "=        =",
        "=        =",
        "=        =",
        "=        =",
        "=        =",
        "=        =",
        "=        =",
        "=========="
    ];
    return addLevel(map, levelConfig);
}

// Register the level
registerLevel("level1", createLevel1);