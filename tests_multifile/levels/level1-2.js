// Register the level
registerLevel("level1-2", createLevel1);

function createLevel1(k) {
    // Add some platforms
    k.add([
        k.rect(120, 20),
        k.pos(40, 100),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    k.add([
        k.rect(120, 20),
        k.pos(200, 100),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    // Add some collectibles
    for (let i = 0; i < 3; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 280), k.rand(40, 80)),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }
} 