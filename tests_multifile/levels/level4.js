function createLevel4(k) {
    // Create disappearing platforms
    const platforms = [
        { x: 40, y: 100, width: 120, height: 20 },
        { x: 200, y: 150, width: 120, height: 20 },
        { x: 360, y: 200, width: 120, height: 20 },
        { x: 520, y: 150, width: 120, height: 20 },
    ];

    platforms.forEach((platform, index) => {
        const p = k.add([
            k.rect(platform.width, platform.height),
            k.pos(platform.x, platform.y),
            k.area(),
            k.body({ isStatic: true }),
            k.color(0, 0, 255),
            "disappearing",
        ]);

        // Make platforms disappear after being touched
        p.onCollide("player", () => {
            k.wait(0.5, () => {
                k.destroy(p);
            });
        });
    });

    // Add collectibles
    for (let i = 0; i < 6; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 600), k.rand(40, 200)),
            k.area(),
            k.color(0, 255, 0),
            "bean",
        ]);
    }
}

// Register the level
registerLevel("level4", createLevel4); 