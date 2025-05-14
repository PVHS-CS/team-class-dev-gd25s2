// Create a bouncing orange that moves left and right
function createOrangy(k, x, y) {
    const orangy = k.add([
        k.sprite("orange", {
            anim: "walk",
            frame: 0
        }),
        k.pos(x, y),
        k.area(),
        k.body(),
        k.scale(0.5),
        "orangy"
    ]);

    // Movement pattern
    let direction = 1;
    const speed = 25;
    const distance = 100;  // How far it walks before turning
    let startX = x;      // Remember starting position
    let canChangeDirection = true;

    // Update movement
    k.onUpdate(() => {
        // Set velocity instead of direct movement
        orangy.vel.x = speed * direction;
        
        // Update sprite direction by flipping only the sprite
        orangy.flipX = direction === 1;

        // Change direction if reached distance limit
        if (Math.abs(orangy.pos.x - startX) > distance) {
            direction *= -1;
        }
    });

    // Handle collisions with a cooldown
    orangy.onCollide("player", () => {
        if (canChangeDirection) {
            direction *= -1;
            startX = orangy.pos.x;  // Reset start position to current position
            canChangeDirection = false;
            // Wait a bit before allowing another direction change
            k.wait(2.0, () => {
                canChangeDirection = true;
            });
        }
    });

    // Handle other collisions
    orangy.onCollide(() => {
        if (canChangeDirection) {
            direction *= -1;
            startX = orangy.pos.x;  // Reset start position to current position
            canChangeDirection = false;
            // Wait a bit before allowing another direction change
            k.wait(2.0, () => {
                canChangeDirection = true;
            });
        }
    });

    return orangy;
} 