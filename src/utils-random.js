// Function to check if a ship can be placed at the given position with adjacent spaces around it
function canPlaceShip(grid, row, col, length, direction) {
    // Check for the surrounding area of the ship (including adjacent cells)
    const adjacents = [
        [-1, -1],
        [-1, 0],
        [-1, 1], // Above row
        [0, -1],
        [0, 1], // Same row, left & right
        [1, -1],
        [1, 0],
        [1, 1], // Below row
    ];

    if (direction === "h") {
        // Check if it fits within the grid and does not overlap
        if (col + length > grid[0].length) return false;
        for (let i = 0; i < length; i++) {
            if (grid[row][col + i] !== 0) return false; // Check if the cell is already occupied
            // Check adjacent cells (top/bottom/left/right)
            for (const [dr, dc] of adjacents) {
                const r = row + dr;
                const c = col + i + dc;
                if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
                    if (grid[r][c] !== 0) return false; // Check if adjacent cell is occupied
                }
            }
        }
    } else if (direction === "v") {
        // Check if it fits within the grid and does not overlap
        if (row + length > grid.length) return false;
        for (let i = 0; i < length; i++) {
            if (grid[row + i][col] !== 0) return false; // Check if the cell is already occupied
            // Check adjacent cells (top/bottom/left/right)
            for (const [dr, dc] of adjacents) {
                const r = row + i + dr;
                const c = col + dc;
                if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
                    if (grid[r][c] !== 0) return false; // Check if adjacent cell is occupied
                }
            }
        }
    }
    return true;
}

// Function to place a ship on the grid
function placeShip(grid, row, col, length, direction) {
    if (direction === "h") {
        for (let i = 0; i < length; i++) {
            grid[row][col + i] = 1; // Mark the cells occupied by the ship
        }
    } else if (direction === "v") {
        for (let i = 0; i < length; i++) {
            grid[row + i][col] = 1; // Mark the cells occupied by the ship
        }
    }
}

// Function to generate a random ship placement with adjacent spacing
function generateRandomShipPlacement(grid, length) {
    const directions = ["h", "v"];
    const direction = directions[Math.floor(Math.random() * 2)];

    let row, col;
    do {
        row = Math.floor(Math.random() * grid.length);
        col = Math.floor(Math.random() * grid[0].length);
    } while (!canPlaceShip(grid, row, col, length, direction));

    placeShip(grid, row, col, length, direction);
    return [length, row, col, direction];
}

// Main function to place multiple ships without collisions and with adjacency rule
function generateShips(numShips, gridSize) {
    const grid = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill(0)
    );
    const shipCoordinates = [];

    const shipLengths = [2, 3, 3, 4, 5]; // Example ship lengths (can adjust for your case)

    for (let i = 0; i < numShips; i++) {
        const length = shipLengths[i % shipLengths.length]; // Get ship length from the predefined array
        const ship = generateRandomShipPlacement(grid, length);
        shipCoordinates.push(ship);
    }

    return shipCoordinates;
}

module.exports = generateShips;
