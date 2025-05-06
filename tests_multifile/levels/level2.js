function createLevel2(k) {
    // Create a more challenging platform layout
    const platforms = [
        { x: 40, y: 100, width: 120, height: 20 },
        { x: 200, y: 150, width: 120, height: 20 },
        { x: 360, y: 200, width: 120, height: 20 },
        { x: 520, y: 150, width: 120, height: 20 },
    ];

    platforms.forEach(platform => {
        k.add([
            k.rect(platform.width, platform.height),
            k.pos(platform.x, platform.y),
            k.area(),
            k.body({ isStatic: true }),
            k.color(0, 0, 255),
        ]);
    });

    // Add more collectibles in harder to reach places
    for (let i = 0; i < 5; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 600), k.rand(40, 200)),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }
} 