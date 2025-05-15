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
        createSpike(k, ttpx(8), ttpx(10));
    
        // Add a portal to level8
        createPortal(k, ttpx(5), ttpx(5), "level8");

        createOrangy(k, ttpx(5 ), ttpx(5));
        createOrangy(k, ttpx(10), ttpx(5));
        createOrangy(k, ttpx(15), ttpx(5));
        createOrangy(k, ttpx(20), ttpx(5));

        createGel(k, ttpx(6), ttpx(12), 255, 0, 0); 

        function createScaledSprite(spriteName, x, y, widthInPixels) {
            const img_width = k.getSprite(spriteName)["data"].tex.width;
            const scaleX = widthInPixels / img_width;
            return k.add([
                k.sprite(spriteName),
                k.pos(ttpx(x), ttpx(y)),
                k.scale(scaleX, scaleX)
            ]);
        }

        createScaledSprite("x", 6, 12, 64);
        createGel(k, ttpx(12), ttpx(12), 0, 255, 0);
        createGel(k, ttpx(18), ttpx(12), 0, 0, 255);
}

// Register the level
registerLevel("level1", createLevel1);