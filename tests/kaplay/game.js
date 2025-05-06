// Initialize Kaplay
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true
});

// Create main scene
k.scene("main", () => {
    // Set gravity
    k.setGravity(1000);
    function createhitbox(x,y) {
        return k.add([

            rect(16, 16),
            pos(x+30, y),
            color(255, 1, 1),
            area(),
            body({ isStatic: true }),
        ]);
    }


    // Add a player
    const player = k.add([
        k.pos(80, 40),
        k.rect(32, 32),
        k.area(),
        k.body(),
        k.color(255, 0, 0),
    ]);

    // Add some platforms
    k.add([
        k.pos(40, 100),
        k.rect(120, 20),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    k.add([
        k.pos(200, 100),
        k.rect(120, 20),
        k.area(),
        k.body({ isStatic: true }),
        k.color(0, 0, 255),
    ]);

    // Add some collectibles
    for (let i = 0; i < 3; i++) {
        k.add([
            k.pos(k.rand(40, 280), k.rand(40, 80)),
            k.circle(8),
            k.area(),
            k.color(0, 255, 0),
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
    k.onKeyDown("space", () => {
        let hitbox = createhitbox(player.x, player.y);
        k.onCollide("hitbox", (hitbox, other) => {
            k.destroy(hitbox);
            k.destroy(other);
        });
    });

    // Scene transition
    k.onKeyPress("p", () => {
        k.go("test");
    });
});

// Create test scene
k.scene("test", () => {
    // Add a simple text
    k.add([
        k.text("Test Scene", { size: 32 }),
        k.pos(400, 300),
        k.origin("center"),
        k.color(255, 255, 255),
    ]);

    // Return to main scene with 'p' key
    k.onKeyPress("p", () => {
        k.go("main");
    });
});

// Start the game
k.go("main"); 