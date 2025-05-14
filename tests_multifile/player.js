// Player creation and controls
function createPlayer(k) {
    const player = k.add([
        k.pos(40, 40),
        k.rect(32, 32),
        k.color(0, 255, 0),
        k.area(),  // Simple area for collision
        k.body(),
        "player"
    ]);

    // Store initial position for reset
    const startPos = k.vec2(40, 40);

    // Add reset position function
    player.resetPosition = () => {
        player.pos = startPos;
        player.vel = k.vec2(0, 0);
    };

    return player;
}

function setupPlayerControls(k, player) {
    // Movement controls
    k.onKeyDown("left", () => {
        player.move(-200, 0);  // Only move horizontally
    });

    k.onKeyDown("right", () => {
        player.move(200, 0);   // Only move horizontally
    });
    
    function handleJump() {
        if (player.isGrounded()) {
            player.jump(400);  // Add specific jump force
        }
    }

    k.onKeyPress("space", handleJump);
    k.onKeyPress("up", handleJump);

    // Reset position with 'w' key
    k.onKeyPress("w", () => {
        player.resetPosition();
    });

    // Collect beans
    player.onCollide("bean", (bean) => {
        k.destroy(bean);
    });

    // Debug collision with portal
    player.onCollide("portal", () => {
        console.log("Player collided with portal!");  // Debug log
    });
} 