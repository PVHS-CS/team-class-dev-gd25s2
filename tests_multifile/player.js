// Player creation and controls
function createPlayer(k) {
    const start_x = 100;
    const start_y = 40;
    
    const player = k.add([
        k.rect(32, 32),
        k.area(),
        k.body(),
        k.pos(start_x, start_y),
        k.color(0, 255, 0),
        "player"
    ]);

    // Reset player position using world coordinates
    k.onKeyDown("w", () => {
        // Reset camera first
        k.setCamPos(0, 0);
        // Then reset player to absolute position
        player.pos.x = start_x;
        player.pos.y = start_y;
    });

    return player;
}

function setupPlayerControls(k, player) {
    // Movement controls
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
} 