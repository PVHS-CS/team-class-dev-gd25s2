// Create a gel that changes player color when eaten
function createGel(k, x, y, r, g, b) {
    const gel = k.add([
        k.circle(16),  // 32px diameter circle
        k.pos(x, y),
        k.area(),
        k.color(r, g, b),
        "gel"
    ]);

    // When player collides with gel
    gel.onCollide("player", () => {
        // Change player color
        k.get("player")[0].color = k.rgb(r, g, b);
        // Destroy the gel
        gel.destroy();
    });

    return gel;
} 