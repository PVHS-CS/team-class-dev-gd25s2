// Player creation and controls
function createPlayer(k) {
    return k.add([
        k.rect(32, 32),
        k.pos(80, 40),
        k.area(),
        k.body(),
        k.color(255, 0, 0), // Red color for player
    ]);
}

function setupPlayerControls(k, player) {
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