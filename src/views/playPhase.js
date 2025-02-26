const getCellBy = require("./utils");

const PlayPhase = () => {
    const loadContent = (playerName, playerBoard, comShips) => {
        const main = document.querySelector(".main");
        main.innerHTML = `
            <div class="game-guidance">Joe Mama</div>
            <div class="gameboards">
                <div class="field p1-field">
                    <div class="players-name">${playerName}'s board</div>
                    <div class="ship-avatars"></div>
                    <div class="gameboard-container">
                        <div class="gameboard-tag">#</div>
                        <div class="gameboard-border border-h"></div>
                        <div class="gameboard-border border-v"></div>
                        <div class="gameboard p1-board"></div>
                    </div>
                </div>
                <div class="field p2-field">
                    <div class="players-name">Comp's board</div>
                    <div class="ship-avatars"></div>
                    <div class="gameboard-container">
                        <div class="gameboard-tag">#</div>
                        <div class="gameboard-border border-h"></div>
                        <div class="gameboard-border border-v"></div>
                        <div class="gameboard p2-board"></div>
                    </div>
                </div>
            </div>
            <div class="button-actions">
                <button class="exit">Exit</button>
            </div>
        `;

        loadBoardContainer();
        loadEmptyBoard();
        loadPlayerShips(playerBoard.shipsMap);
        loadShipAvatars(playerBoard.ships, "p1-field");
        loadShipAvatars(comShips, "p2-field");
    };

    return { loadContent };
};

const loadEmptyBoard = () => {
    let boardHtml = "";
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            boardHtml += `
                    <div class="gameboard-cell" data-row="${row}" data-col="${col}"></div>
                `;
        }
    }
    const boards = document.querySelectorAll(".gameboard");
    boards.forEach((board) => {
        board.innerHTML = boardHtml;
    });
};

const loadPlayerShips = (board) => {
    const shipPositions = board
        .flatMap((rowArr, row) =>
            rowArr.map((occupy, col) =>
                occupy ? { row, col, ship: occupy } : null
            )
        )
        .filter((position) => position !== null); // Remove null entries

    for (const { row, col, ship } of shipPositions) {
        let cell = getCellBy(".p1-board", row, col);
        if (cell) {
            cell.dataset.id = ship.id; // Set the ship id on the cell
        }

        for (const [dr, dc] of adjacentOffsets) {
            const adjacentRow = row + dr,
                adjacentCol = col + dc;

            let adjacentCell = getCellBy(".p1-board", adjacentRow, adjacentCol);
            if (adjacentCell) {
                adjacentCell.dataset.adjacent = "true"; // Mark the cell as adjacent
            }
        }
    }
};

const loadBoardContainer = () => {
    let borderNumber = "";
    for (let i = 0; i < 10; i++) {
        borderNumber += `<div>${i}</div>`;
    }

    const boardBorder = document.querySelectorAll(".gameboard-border");
    boardBorder.forEach((border) => {
        border.innerHTML = borderNumber;
    });
};

const loadShipAvatars = (_ships, query) => {
    const ships = _ships;
    ships.sort((a, b) => a.length - b.length);
    console.log("ships", ships);
    let avatarsHTML = "";
    ships.forEach((ship) => {
        let avatarShip = "";
        for (let i = 0; i < ship.length; i++) {
            avatarShip += `<div class="avatar-box"></div>`;
        }
        avatarsHTML += `<div data-id="${ship.id}">${avatarShip}</div>`;
    });

    const shipAvatars = document.querySelector(`.${query} > .ship-avatars`);
    console.log("shipAvatars", shipAvatars);
    console.log(`.${query} > .ship-avatars`);
    if (shipAvatars) shipAvatars.innerHTML = avatarsHTML;
};

const adjacentOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1], // Atas
    [0, -1],
    [0, 1], // Kiri & Kanan
    [1, -1],
    [1, 0],
    [1, 1], // Bawah
];

module.exports = PlayPhase;
