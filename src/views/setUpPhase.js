const drag = require("./drag");

const setUpShipsOnBoard = () => {
    const ships = document.querySelectorAll(".unplaced-ship.drag-able");
    const body = document.querySelector("body");
    const gameboard = document.querySelector(".temporary-board");
    const rect = gameboard.getBoundingClientRect();

    ships.forEach((ship) => {
        const movingClone = ship.cloneNode(false);
        movingClone.classList.add("dragging");

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;
        let lastHoveredCells = [];

        const shipLength = parseInt(ship.dataset.length);
        let direction = "h"; // Default direction

        movingClone.style.width =
            parseInt(movingClone.style.width, 10) + (shipLength - 1) + "px";

        ship.addEventListener("mousedown", (e) => {
            isDragging = true;
            ship.classList.add("invisible");

            offsetY = ship.offsetHeight / 2;
            offsetX = ship.offsetHeight / 2;

            movingClone.style.left = `${e.pageX - offsetX}px`;
            movingClone.style.top = `${e.pageY - offsetY}px`;

            body.appendChild(movingClone);
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;

            movingClone.style.left = `${e.pageX - offsetX}px`;
            movingClone.style.top = `${e.pageY - offsetY}px`;

            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                movingClone.style.visibility = "hidden";
                const boardCell = document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );
                if (boardCell)
                    updateHoverEffect(boardCell, shipLength, direction);
            } else {
                movingClone.style.visibility = "visible";
                clearHoverEffect();
            }
        });

        document.addEventListener("mouseup", (e) => {
            if (!isDragging) return;
            isDragging = false;
            ship.classList.remove("invisible");
            clearHoverEffect();

            const x = e.clientX;
            const y = e.clientY;
            const boardCell = document.elementFromPoint(x, y);

            if (boardCell && boardCell.classList.contains("gameboard-cell")) {
                boardCell.append(movingClone);
                movingClone.style.top = 0;
                movingClone.style.left = 0;
                movingClone.style.visibility = "visible";
                movingClone.style.zIndex = 1000;
                movingClone.style.opacity = 0.7;
            } else {
                if (body.contains(movingClone)) body.removeChild(movingClone);
            }
        });

        const updateHoverEffect = (cell, length, dir) => {
            clearHoverEffect();

            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);

            for (let i = 0; i < length; i++) {
                let targetCell;
                if (dir === "h") {
                    targetCell = document.querySelector(
                        `.temporary-board > div[data-row="${row}"][data-col="${
                            col + i
                        }"]`
                    );
                } else {
                    targetCell = document.querySelector(
                        `.temporary-board > div[data-row="${
                            row + i
                        }"][data-col="${col}"]`
                    );
                }

                if (targetCell) {
                    targetCell.classList.add("place-valid");
                    lastHoveredCells.push(targetCell);
                }
            }
        };

        const clearHoverEffect = () => {
            lastHoveredCells.forEach((cell) =>
                cell.classList.remove("place-valid")
            );
            lastHoveredCells = [];
        };
    });
};

const loadSetUpPhase = () => {
    document.querySelector(".header").classList.add("shrink");
    const main = document.querySelector(".main");
    main.innerHTML = `
        <div class="game-guidance">
            Place ships on board <br />
            Tap here or type 'R' to ratate
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
            <div class="gameboard temporary-board"></div>
            <div class="set-up-actions">
                <button>Clear ships</button>
                <button>Place ships randomly</button>
                <button>Play Game</button>
            </div>
        </div>`;

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
    drag();

    // setUpShipsOnBoard();
};

module.exports = loadSetUpPhase;
