// Create a spike that kills the player on contact
function createSpike(k, x, y) {
    const spike = k.add([
        k.sprite("spike"),
        k.pos(x, y),
        k.area(),
        "spike"
    ]);

    // Handle collision with player
    spike.onCollide("player", (player) => {
        // Add kaboom effect at player position
        k.addKaboom(player.pos);
        // Shake the screen
        k.shake();
        // Reset player position
        if (player.resetPosition) {
            player.resetPosition();
        }
        // Destroy the spike
        spike.destroy();
    });

    return spike;
} 