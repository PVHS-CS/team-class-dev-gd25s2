// Create a moving platform that moves horizontally
function createMovingPlatform(k, x, y) {
    const platform = k.add([
        k.rect(120, 20),
        k.pos(x, y),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
        "movingPlatform"
    ]);

    // Animate the moving platform
    let direction = 1;
    const speed = 100;
    k.onUpdate(() => {
        // Set velocity instead of direct position changes
        platform.vel.x = speed * direction;
        
        // Change direction at boundaries
        if (platform.pos.x > x + 120) direction = -1;
        if (platform.pos.x < x - 120) direction = 1;
    });

    return platform;
} 