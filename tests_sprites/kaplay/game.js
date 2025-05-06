// Initialize Kaplay
const k = kaplay({
    width: 800,
    height: 600,
    background: [0, 0, 0],
    scale: 1,
    clearColor: [0, 0, 0],
    debug: true
});
// loading sprites
loadSprite("test_sprite", "/tests_sprites/kaplay/test_sprite.png");
loadSprite("slime_test", "/tests_sprites/kaplay/slime.test.png");
//loading sprite sheet 
loadSprite("slime_test", "/tests_sprites/kaplay/slime.test.png", {
    sliceX: 2, // how many sprites are in the X axis
    sliceY: 3, // how many sprites are in the Y axis
    anims: {
        jump: { from: 0, to: 8, loop: false }
    },
});

// Create a simple scene
k.scene("main", () => {
    // Set gravity
    k.setGravity(1000);

    // Add a player (using a rectangle instead of sprite)
    const player = k.add([
        k.pos(80, 40),
        k.area(),
        k.body(),
        k.sprite("slime_test"),
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