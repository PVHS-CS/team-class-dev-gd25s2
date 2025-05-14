// Shared level configuration
const levelConfig = {
    // Tile dimensions
    tileWidth: 32,
    tileHeight: 32,
    
    // Tile types and their sprites
    tiles: {
        "=": () => [
            sprite("floor"),
            area(),
            k.body({ isStatic: true }),
            k.offscreen({ hide: true, pause: true, unpause: true }),
            "floor"
        ],
        "$": () => [
            sprite("coin"),
            area(),
            k.offscreen({ hide: true, pause: true, unpause: true }),
            "coin"
        ],
        "^": () => [
            sprite("spike"),
            area(),
            "spike"
        ],
        "&": () => [
            sprite("special"),
            area(),
            k.offscreen({ hide: true, pause: true, unpause: true }),
            "special"
        ]
    }
}; 