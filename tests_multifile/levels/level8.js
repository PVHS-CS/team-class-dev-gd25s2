function createLevel8(k) {
    // Add some platforms
    k.add([
        k.rect(120, 20),
        k.pos(40, 100),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);
    // Create 15 platforms in a descending pattern
    for (let i = 0; i < 1500; i++) {
        k.add([
            // k.rect(120, 20),
            k.sprite("floor"),
            k.pos(200 + (i * 40), 100 + (i * 60)), // Stagger platforms diagonally
            k.area(),
            k.body({ isStatic: true }),

            k.offscreen({ hide: true, pause: true, unpause: true }),
            k.color(0, 0, 255),
        ]);
    }

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