const generateShips = require("../utils-random");
const {
    createGrabShip,
    placeShipOnBoard,
    removePlacedShipEvents,
    boardShipEvents,
} = require("./clickAndDrop");
const getCellBy = require("./utils");

const loadSetUpPhase = () => {
    document.querySelector(".header").classList.add("shrink");
    const main = document.querySelector(".main");
    main.innerHTML = `
        <div class="game-guidance">
            1. Click on the board to place ships. <br />
            2. Double-click on a ship to remove it from the board. <br />
            3. Tap here or press 'R' to rotate the ship.
        </div>
        <div class="set-up">
            <div class="unplaced-ships">
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 80px"
                    data-length="2" data-id="1"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                    data-length="3" data-id="2"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                    data-length="3" data-id="3"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 160px"
                    data-length="4" data-id="4"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 200px"
                    data-length="5" data-id="5"
                    ></div>                    

            </div>
            <div class="gameboard-container">
                <div class="gameboard-tag">#</div>
                <div class="gameboard-border border-h"></div>
                <div class="gameboard-border border-v"></div>
                <div class="gameboard temporary-board"></div>
            </div>
            <div class="set-up-actions">
                <button class="clear-ship">Clear ships</button>
                <button class="place-randomly">Place ships randomly</button>
                <button>Play Game</button>
            </div>
        </div>`;

    loadBoardContainer();
    loadEmptyBoard();
    attachEvents();

    boardShipEvents();

    // setUpShipsOnBoard();
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

const loadEmptyBoard = () => {
    const board = document.querySelector(".temporary-board");
    if (board) {
        let boardHtml = "";
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                boardHtml += `
                    <div class="gameboard-cell" data-row="${row}" data-col="${col}"></div>
                `;
            }
        }
        board.innerHTML = boardHtml;
    }

    removePlacedShipEvents();
};

const attachEvents = () => {
    const clearShips = document.querySelector(".clear-ship");
    if (clearShips) clearShips.addEventListener("click", resetSetUpBoard);

    const placeRandomly = document.querySelector(".place-randomly");
    if (placeRandomly)
        placeRandomly.addEventListener("click", setUpBoardRandomly);
};

const resetSetUpBoard = () => {
    loadEmptyBoard();
    const unplacedShips = document.querySelectorAll(".unplaced-ship");
    unplacedShips.forEach((unplacedShip) => {
        unplacedShip.classList.remove("invisible");
    });
};

const setUpBoardRandomly = () => {
    resetSetUpBoard();

    const unplacedShips = document.querySelectorAll(".unplaced-ship");
    unplacedShips.forEach((unplacedShip) => {
        unplacedShip.classList.add("invisible");
    });

    const randomCoords = generateShips(5, 10);

    let id = 1;
    for (const [len, row, col, dir] of randomCoords) {
        const cell = getCellBy(".temporary-board", row, col);
        const ship = createGrabShip(id, len, dir);
        placeShipOnBoard(cell, ship, dir);

        id += 1;
    }
};

module.exports = loadSetUpPhase;
