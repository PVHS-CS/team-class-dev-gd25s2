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

    // Create moving platform using the new component
    createMovingPlatform(k, 280, 150);

    // Add a spike
    createSpike(k, 200, 40);

    // Add a portal to level8
    createPortal(k, 120, 40, "level8");

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