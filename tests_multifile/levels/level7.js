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



    return level;
} 