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

        let currentWidth = parseFloat(movingClone.style.width);
        movingClone.style.width = `${
            currentWidth + parseInt(ship.dataset.length) - 1
        }px`;

        ship.addEventListener("mousedown", (e) => {
            isDragging = true;
            ship.classList.add("invisible");

            offsetY = ship.offsetHeight / 2;
            offsetX = ship.offsetHeight / 2;

            movingClone.style.left = `${e.pageX - offsetY}px`;
            movingClone.style.top = `${e.pageY - offsetY}px`;

            body.appendChild(movingClone);
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            if (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            ) {
                movingClone.style.visibility = "hidden";
            } else {
                movingClone.style.visibility = "visible";
            }
            movingClone.style.left = `${e.pageX - offsetY}px`;
            movingClone.style.top = `${e.pageY - offsetY}px`;
        });

        document.addEventListener("mouseup", (e) => {
            if (!isDragging) return;
            isDragging = false;
            ship.classList.remove("invisible");

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
                const isDirectChild = Array.from(body.children).includes(
                    movingClone
                );
                if (isDirectChild) body.removeChild(movingClone);
            }
        });
    });
};

const hoverSetUpboard = (cell, length, direction = "h") => {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
};

const loadSetUpPhase = () => {
    document.querySelector(".header").classList.add("shrink");
    const main = document.querySelector(".main");
    main.innerHTML = `
        <div class="game-guidance">
            Place ships on board <br />
            Tap or type 'R' to ratate
        </div>
        <div class="set-up">
            <div class="unplaced-ships">
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 80px"
                    data-length="2"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                    data-length="3"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                    data-length="3"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 160px"
                    data-length="4"
                    ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 200px"
                    data-length="5"
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

    setUpShipsOnBoard();
};

module.exports = loadSetUpPhase;
