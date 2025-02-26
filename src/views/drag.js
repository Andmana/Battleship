const getCellBy = require("./utils");

const drag = () => {
    const ships = document.querySelectorAll(".unplaced-ship.drag-able");
    const body = document.querySelector("body");
    const gameboard = document.querySelector(".temporary-board");
    const boardRect = gameboard.getBoundingClientRect();

    let isDragging = false;
    let direction = "h";
    let movingShip;
    let movingShipLength;
    let lastHoveredCells = [];

    ships.forEach((ship) => {
        ship.addEventListener("click", (e) => {
            console.log("clcik");
            isDragging = true;
            ship.classList.add("invisible");

            movingShip = createGrabShip(
                ship.dataset.id,
                ship.dataset.length,
                direction
            );
            movingShipLength = parseInt(movingShip.dataset.length);
            movingShip.style.left = `${e.pageX - 20}px`;
            movingShip.style.top = `${e.pageY - 20}px`;
            movingShip.classList.add("dragging");

            body.appendChild(movingShip);
        });
    });

    document.addEventListener("mousemove", (e) => {
        console.log("move");

        if (!isDragging) return;
        if (movingShip) {
            movingShip.style.left = `${e.pageX - 20}px`;
            movingShip.style.top = `${e.pageY - 20}px`;

            if (
                e.clientX >= boardRect.left &&
                e.clientX <= boardRect.right &&
                e.clientY >= boardRect.top &&
                e.clientY <= boardRect.bottom
            ) {
                movingShip.style.visibility = "hidden";
                const boardCell = document.elementFromPoint(
                    e.clientX,
                    e.clientY
                );
                if (boardCell) updateHoverEffect(boardCell, movingShipLength);
            } else {
                movingShip.style.visibility = "visible";
                clearHoverEffect();
            }
        }
    });

    document.addEventListener("mouseup", (e) => {
        console.log("unclick");
        if (!isDragging) return;

        isDragging = false;

        const boardCell = document.elementFromPoint(e.clientX, e.clientY);
        if (boardCell && boardCell.classList.contains("gameboard-cell")) {
            const placedShip = createGrabShip(
                movingShip.dataset.id,
                movingShipLength,
                direction
            );
            placedShip.classList.add("placed-ship");
            if (isValidCells(boardCell))
                placeShipOnBoard(boardCell, placedShip, direction);
            else {
                showInvisibleShip(movingShip.dataset.id);
            }
            clearHoverEffect();
        } else {
            showInvisibleShip(movingShip.dataset.id);
        }

        const draggings = document.querySelectorAll(".dragging");
        draggings.forEach((dragging) => {
            if (dragging.parentNode === body) {
                body.removeChild(dragging);
            }
        });
    });

    //rotate
    // Rotate by type
    document.addEventListener("keydown", function (event) {
        if (event.key === "r" || event.key === "R") {
            direction = direction === "h" ? "v" : "h";
        }

        if (movingShip) {
            const length = movingShipLength;
            if (direction === "v") {
                movingShip.style.height = `${length * 40 + length - 1}px`;
                movingShip.style.width = "40px";
            } else {
                movingShip.style.width = `${length * 40 + length - 1}px`;
                movingShip.style.height = "40px";
            }
        }
    });
    // by click
    document.querySelector(".game-guidance").addEventListener("click", () => {
        direction = direction === "h" ? "v" : "h";
    });

    const updateHoverEffect = (cell, length) => {
        clearHoverEffect();

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        let hoverClass =
            (direction === "h" ? col : row) + length - 1 < 10
                ? "place-valid"
                : "place-invalid";

        lastHoveredCells = [];

        for (let i = 0; i < length; i++) {
            const targetRow = direction === "h" ? row : row + i;
            const targetCol = direction === "h" ? col + i : col;

            const targetCell = document.querySelector(
                `.temporary-board > div[data-row="${targetRow}"][data-col="${targetCol}"]`
            );

            if (targetCell) {
                lastHoveredCells.push(targetCell);
                if (targetCell.dataset.adjacent === "true")
                    hoverClass = "place-invalid";
            }
        }

        lastHoveredCells.forEach((cell) => cell.classList.add(hoverClass));
    };

    const clearHoverEffect = () => {
        lastHoveredCells.forEach((cell) =>
            cell.classList.remove("place-valid", "place-invalid")
        );
        lastHoveredCells = [];
    };

    const isValidCells = (cell) => {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if ((direction === "h" ? col : row) + movingShipLength - 1 >= 10) {
            console.log("1");
            return false;
        }

        const adjacents = [
            [-1, -1],
            [-1, 0],
            [-1, 1], // Atas
            [0, -1],
            [0, 1], // Kiri & Kanan
            [1, -1],
            [1, 0],
            [1, 1], // Bawah
        ];
        let targetCell;
        for (let i = 0; i < movingShipLength; i++) {
            const targetRow = direction === "h" ? row : row + i;
            const targetCol = direction === "h" ? col + i : col;

            targetCell = getCellBy(".temporary-board", targetRow, targetCol);
            if (
                targetCell &&
                (targetCell.dataset.adjacent == "true" || targetCell.dataset.id)
            ) {
                console.log("2");

                return false;
            }

            for (const [dr, dc] of adjacents) {
                const r = targetRow + dr,
                    c = targetCol + dc;
                targetCell = getCellBy(".temporary-board", r, c);
                if (targetCell && targetCell.dataset.id) {
                    console.log("3 ", r, c);

                    return false;
                }
            }
        }

        return true;
    };

    const removePlacedShip = () => {
        const cells = document.querySelectorAll(".temporary-board > div");
        cells.forEach((cell) => {
            // better event trigger
            cell.addEventListener("dblclick", () => {
                console.log("remove ship");
                const placedShip = document.querySelector(
                    `.placed-ship[data-id="${cell.dataset.id}"]`
                );

                if (placedShip && !isDragging) {
                    placedShip.remove();
                    showInvisibleShip(cell.dataset.id);

                    removeCellMark(cell.dataset.id);
                    updateAdjacent();
                }
            });
        });
    };

    removePlacedShip();
};

const createGrabShip = (_id, _length, direction) => {
    const length = parseInt(_length);
    const id = parseInt(_id);
    const clone = document.createElement("div");
    clone.dataset.id = id;
    clone.dataset.length = length;

    if (direction === "v") {
        clone.style.height = `${length * 40 + length - 1}px`;
        clone.style.width = "40px";
    } else {
        clone.style.width = `${length * 40 + length - 1}px`;
        clone.style.height = "40px";
    }

    return clone;
};

const showInvisibleShip = (id) => {
    document
        .querySelector(`.unplaced-ship[data-id="${id}"]`)
        .classList.remove("invisible");
};

const placeShipOnBoard = (_startCell, ship, direction) => {
    const startCell = _startCell;
    startCell.dataset.isStart = "true";
    startCell.appendChild(ship);

    const row = parseInt(startCell.dataset.row);
    const col = parseInt(startCell.dataset.col);

    const adjacents = [
        [-1, -1],
        [-1, 0],
        [-1, 1], // Atas
        [0, -1],
        [0, 1], // Kiri & Kanan
        [1, -1],
        [1, 0],
        [1, 1], // Bawah
    ];
    let targetCell;
    for (let i = 0; i < ship.dataset.length; i++) {
        const targetRow = direction === "h" ? row : row + i;
        const targetCol = direction === "h" ? col + i : col;

        targetCell = getCellBy(".temporary-board", targetRow, targetCol);
        if (targetCell) {
            targetCell.dataset.id = ship.dataset.id;
        }

        for (const [dr, dc] of adjacents) {
            const r = targetRow + dr,
                c = targetCol + dc;
            targetCell = getCellBy(".temporary-board", r, c);
            if (targetCell) targetCell.dataset.adjacent = "true";
        }
    }
};

const removeCellMark = (id) => {
    console.log("remove id", id);
    const cellPlacedShip = document.querySelectorAll(
        `.temporary-board >div[data-id="${id}"]`
    );
    console.log("cellPlacedShip", cellPlacedShip);

    cellPlacedShip.forEach((cell) => {
        console.log(cell.dataset.row, cell.dataset.col);
        cell.removeAttribute("data-id");
        cell.removeAttribute("data-is-start");
    });
};

const updateAdjacent = () => {
    const adjacents = [
        [-1, -1],
        [-1, 0],
        [-1, 1], // Atas
        [0, -1],
        [0, 1], // Kiri & Kanan
        [1, -1],
        [1, 0],
        [1, 1], // Bawah
    ];

    const cells = document.querySelectorAll(`.temporary-board > div`);
    cells.forEach((cell) => {
        const row = parseInt(cell.dataset.row, 10);
        const col = parseInt(cell.dataset.col, 10);

        let isAdjacent = false;
        for (const [r, c] of adjacents) {
            const adCell = getCellBy(".temporary-board", row + r, col + c);
            if (adCell && adCell.dataset.id) {
                isAdjacent = true;
                break;
            }
        }

        cell.dataset.adjacent = isAdjacent.toString();
    });
};

module.exports = drag;
