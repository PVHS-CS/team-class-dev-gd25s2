function createLevel5(k) {
    // Create a mix of static and moving platforms
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

    // Create moving platforms
    const movingPlatform1 = k.add([
        k.rect(120, 20),
        k.pos(280, 150),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    const movingPlatform2 = k.add([
        k.rect(120, 20),
        k.pos(400, 200),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    // Animate the moving platforms using velocity
    let direction1 = 1;
    let direction2 = -1;
    const speed1 = 100;
    const speed2 = 50;
    k.onUpdate(() => {
        // Set velocities instead of direct position changes
        movingPlatform1.vel.x = speed1 * direction1;
        if (movingPlatform1.pos.x > 400) direction1 = -1;
        if (movingPlatform1.pos.x < 200) direction1 = 1;

        movingPlatform2.vel.y = speed2 * direction2;
        if (movingPlatform2.pos.y > 250) direction2 = -1;
        if (movingPlatform2.pos.y < 150) direction2 = 1;
    });

    // Add collectibles in challenging positions
    for (let i = 0; i < 8; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 600), k.rand(40, 300)),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }
}

// Register the level
registerLevel("level5", createLevel5); 