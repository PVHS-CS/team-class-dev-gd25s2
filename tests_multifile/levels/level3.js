
registerLevel("level3", createLevel3);

function createLevel3(k) {
    // Create static platforms
    const staticPlatforms = [
        { x: 40, y: 100, width: 120, height: 20 },
        { x: 520, y: 100, width: 120, height: 20 },
    ];

    staticPlatforms.forEach(platform => {
        k.add([
            k.rect(platform.width, platform.height),
            k.pos(platform.x, platform.y),
            k.area(),
            k.body({ isStatic: true }),
            k.color(0, 0, 255),
        ]);
    });

    // Create moving platform
    const movingPlatform = k.add([
        k.rect(120, 20),
        k.pos(280, 150),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    // Animate the moving platform
    let direction = 1;
    k.onUpdate(() => {
        movingPlatform.pos.x += 100 * direction * k.dt();
        if (movingPlatform.pos.x > 400) direction = -1;
        if (movingPlatform.pos.x < 200) direction = 1;
    });

    // Add collectibles
    for (let i = 0; i < 4; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 600), k.rand(40, 200)),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }
} 