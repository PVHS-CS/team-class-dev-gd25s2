// Initialize Kaplay
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true
});

// Create a simple scene
k.scene('test', () => {
    k.add([
        k.rect(120, 20),
        k.pos(70, 150),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);
})
k.scene("main", () => {
    k.onKeyDown("p", () => {
        k.go("test");
    });

    // Set gravity
    k.setGravity(1000);

    // Add a player (using a rectangle instead of sprite)
    const player = k.add([
        k.rect(32, 32),
        k.pos(80, 40),
        k.area(),
        k.body(),   
        k.color(255, 0, 0), // Red color for player
    ]);

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

    // Add some collectibles (using circles instead of sprites)
    for (let i = 0; i < 3; i++) {
        k.add([
            k.circle(8),
            k.pos(k.rand(40, 280), k.rand(40, 80)),
            k.area(),
            k.color(0, 255, 0), // Green color for collectibles
            "bean",
        ]);
    }

    // Player movement
    k.onKeyDown("left", () => {
        player.move(-200, 0);
    });

    k.onKeyDown("right", () => {
        player.move(200, 0);
    });

    k.onKeyDown("up", () => {
        if (player.isGrounded()) {
            player.jump(400);
        }
    });

    // Collect beans
    player.onCollide("bean", (bean) => {
        k.destroy(bean);
    });
});

// Start the game
k.go("main"); 
