// Level 7 - A long, narrow vertical level
function createLevel7() {
    // Create a long, narrow map (20x60 tiles)
    const map = [];
    const width = 20;
    const height = 60;

    // Helper function to create a row of a specific character
    const createRow = (char, length) => char.repeat(length);

    // Create the basic structure
    for (let y = 0; y < height; y++) {
        if (y === 0 || y === height - 1) {
            // Top and bottom walls
            map.push(createRow("=", width));
        } else {
            // Regular row with elements
            let row = "";
            for (let x = 0; x < width; x++) {
                if (x === 0 || x === width - 1) {
                    // Vertical walls
                    row += "=";
                } else if (y % 8 === 0) {
                    // Horizontal platforms every 8 rows
                    if (x >= 3 && x <= 16) {
                        row += "=";
                    } else {
                        row += " ";
                    }
                } else if (y % 8 === 2) {
                    // Coins above platforms
                    if (x === 5 || x === 10 || x === 15) {
                        row += "c";
                    } else {
                        row += " ";
                    }
                } else if (y % 8 === 4) {
                    // Spikes between platforms
                    if (x === 7 || x === 13) {
                        row += "^";
                    } else {
                        row += " ";
                    }
                } else if (y % 8 === 6) {
                    // Special items below platforms
                    if (x === 9 || x === 11) {
                        row += "s";
                    } else {
                        row += " ";
                    }
                } else {
                    // Empty space
                    row += " ";
                }
            }
            map.push(row);
        }
    }

    // Add some vertical platforms for climbing
    for (let y = 1; y < height - 1; y++) {
        if (y % 16 === 0) {
            for (let x = 5; x < 15; x += 5) {
                map[y] = map[y].substring(0, x) + "=" + map[y].substring(x + 1);
            }
        }
    }

    // Create the level
    const level = addLevel(map, levelConfig);

    // Store the original map for recreation
    level.originalMap = map;

    // Add update handler to recreate items
    level.onUpdate(() => {
        const cPose = k.getCamPos();
        const viewWidth = k.width() / k.scale();
        const viewHeight = k.height() / k.scale();
        
        // Check each tile in the current view
        for (let y = Math.floor(cPose.y / 32); y < Math.ceil((cPose.y + viewHeight) / 32); y++) {
            for (let x = Math.floor(cPose.x / 32); x < Math.ceil((cPose.x + viewWidth) / 32); x++) {
                if (y >= 0 && y < map.length && x >= 0 && x < map[0].length) {
                    const tile = map[y][x];
                    const worldX = x * 32;
                    const worldY = y * 32;
                    
                    // Check if there's already an item at this position
                    const existingItems = k.get("coin", "spike", "special").filter(item => 
                        Math.abs(item.pos.x - worldX) < 1 && 
                        Math.abs(item.pos.y - worldY) < 1
                    );
                    
                    if (existingItems.length === 0) {
                        // Recreate items based on tile type
                        if (tile === "c") {
                            k.add([
                                k.sprite("coin"),
                                k.area(),
                                k.pos(worldX, worldY),
                                "coin"
                            ]);
                        } else if (tile === "^") {
                            k.add([
                                k.sprite("spike"),
                                k.area(),
                                k.pos(worldX, worldY),
                                "spike"
                            ]);
                        } else if (tile === "s") {
                            k.add([
                                k.sprite("special"),
                                k.area(),
                                k.pos(worldX, worldY),
                                "special"
                            ]);
                        }
                    }
                }
            }
        }
    });

    return level;
}

// Register this level
registerLevel("level7", createLevel7); 