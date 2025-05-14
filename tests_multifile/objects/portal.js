// Create a portal that transports player to specified room
function createPortal(k, x, y, targetRoom) {
    const portal = k.add([
        k.sprite("special"),  // Using special sprite for portal
        k.pos(x, y),
        k.area(),  // Simple area for collision
        k.color(0, 255, 255),  // Cyan color for portal
        "portal"
    ]);

    // Add a pulsing effect using opacity instead of scale
    let opacity = 1;
    let fading = true;
    k.onUpdate(() => {
        if (fading) {
            opacity -= 0.02;
            if (opacity <= 0.5) fading = false;
        } else {
            opacity += 0.02;
            if (opacity >= 1) fading = true;
        }
        portal.opacity = opacity;
    });

    // Use built-in collision system
    portal.onCollide("player", () => {
        console.log("Portal collision detected!");
        
        // Create a black overlay for transition
        const overlay = k.add([
            k.rect(k.width(), k.height()),
            k.color(0, 0, 0),
            k.opacity(0),
            k.fixed(),
            k.z(100),
        ]);

        // Fade out
        k.tween(
            overlay.opacity,
            1,
            0.5,
            (val) => overlay.opacity = val,
            k.easings.linear
        ).onEnd(() => {
            // Change room
            k.go(targetRoom);
            
            // Fade in
            k.tween(
                overlay.opacity,
                0,
                0.5,
                (val) => overlay.opacity = val,
                k.easings.linear
            );
        });
    });

    return portal;
} 