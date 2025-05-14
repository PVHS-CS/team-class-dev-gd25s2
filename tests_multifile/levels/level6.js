// Level 6 - A tiny 10x10 level
function createLevel6() {
    // Create a tiny map (10x10 tiles)
    const map = [];
    const width = 10;
    const height = 10;

    // Helper function to create a row of a specific character
    const createRow = (char, length) => char.repeat(length);

    // Create the basic structure
    for (let y = 0; y < height; y++) {
        if (y === 0 || y === height - 1) {
            // Top and bottom walls
            map.push(createRow("=", width));
        } else if (y === 5) {
            // Middle platform
            map.push(createRow("=", width));
        } else {
            // Regular row with some elements
            let row = "";
            for (let x = 0; x < width; x++) {
                if (x === 0 || x === width - 1) {
                    // Vertical walls
                    row += "=";
                } else if (x === 3 && y === 3) {
                    // A coin
                    row += "$";
                } else if (x === 7 && y === 3) {
                    // A spike
                    row += "^";
                } else if (x === 5 && y === 7) {
                    // A special item
                    row += "&";
                } else {
                    // Empty space
                    row += " ";
                }
            }
            map.push(row);
        }
    }
    return addLevel(map, levelConfig);
} 
// Register the level
registerLevel("level6", createLevel6); 