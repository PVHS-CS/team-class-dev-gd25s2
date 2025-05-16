function ttpx(x) {
    return x*32;
}

function createLevelCarter() {
    const map = [
        "=== === === === === ===",
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
        "=        ===          =",
        "======================="
    ];
    addLevel(map, levelConfig);


    createMovingPlatform(k, ttpx(5), ttpx(5));
    createMovingPlatform(k, ttpx(3), ttpx(9));
    createMovingPlatform(k, ttpx(7), ttpx(7));
    createMovingPlatform(k, ttpx(5), ttpx(11));
    createMovingPlatform(k, ttpx(10), ttpx(7));
    createMovingPlatform(k, ttpx(13), ttpx(11));
    createMovingPlatform(k, ttpx(14), ttpx(6));
    createMovingPlatform(k, ttpx(16), ttpx(9));
    createMovingPlatform(k, ttpx(16), ttpx(7));
 
 
    // Add a spike
        createSpike(k, ttpx(13), ttpx(6));
    createSpike(k, ttpx(10), ttpx(11));


   // Add a portal to level4
   createPortal(k, ttpx(18), ttpx(5), "level8");

    
}


// Register the level
registerLevel("carter", createLevelCarter);

