const getCellBy = require("./utils");

const boardShipEvents = () => {
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

    function mouseMove(e) {
        if (!isDragging) return;
        if (movingShip) {
            movingShip.style.left = `${e.pageX - 20}px`;
            movingShip.style.top = `${e.pageY - 20}px`;

            if (
                e.pageX >= boardRect.left &&
                e.pageX <= boardRect.right &&
                e.pageY >= boardRect.top &&
                e.pageY <= boardRect.bottom
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
    }
    document.addEventListener("mousemove", mouseMove);

    function mouseUp(e) {
        if (!isDragging) return;

        isDragging = false;

        const boardCell = document.elementFromPoint(e.clientX, e.clientY);
        if (boardCell && boardCell.classList.contains("gameboard-cell")) {
            const placedShip = createGrabShip(
                movingShip.dataset.id,
                movingShipLength,
                direction
            );
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
    }

    document.addEventListener("mouseup", mouseUp);

    //rotates
    // Rotate by type
    function rotateR(e) {
        if (e.key === "r" || e.key === "R") {
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
    }
    document.addEventListener("keydown", rotateR);
    // rotate by click
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
            return false;
        }

        let targetCell;
        for (let i = 0; i < movingShipLength; i++) {
            const targetRow = direction === "h" ? row : row + i;
            const targetCol = direction === "h" ? col + i : col;

            targetCell = getCellBy(".temporary-board", targetRow, targetCol);
            if (
                targetCell &&
                (targetCell.dataset.adjacent == "true" || targetCell.dataset.id)
            ) {
                return false;
            }

            for (const [dr, dc] of adjacents) {
                const r = targetRow + dr,
                    c = targetCol + dc;
                targetCell = getCellBy(".temporary-board", r, c);
                if (targetCell && targetCell.dataset.id) {
                    return false;
                }
            }
        }

        return true;
    };

    const removeDocumentEvent = () => {
        document.removeEventListener("keydown", rotateR);
        document.removeEventListener("mouseup", mouseUp);
        document.removeEventListener("mousemove", mouseMove);
    };

    return { removeDocumentEvent };
};

const createGrabShip = (_id, _length, direction) => {
    const length = parseInt(_length);
    const id = parseInt(_id);
    const clone = document.createElement("div");
    clone.dataset.id = id;
    clone.dataset.length = length;
    clone.dataset.direction = direction;

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

const placeShipOnBoard = (_startCell, _ship, direction) => {
    const startCell = _startCell;
    const ship = _ship;
    startCell.dataset.isStart = "true";
    startCell.dataset.length = ship.dataset.length;
    startCell.dataset.direction = ship.dataset.direction;
    startCell.appendChild(ship);
    ship.classList.add("placed-ship");

    const row = parseInt(startCell.dataset.row);
    const col = parseInt(startCell.dataset.col);

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

const removePlacedShipEvents = () => {
    const cells = document.querySelectorAll(".temporary-board > div");
    cells.forEach((cell) => {
        // better event trigger
        cell.addEventListener("dblclick", () => {
            const placedShip = document.querySelector(
                `.placed-ship[data-id="${cell.dataset.id}"]`
            );

            if (placedShip) {
                placedShip.remove();
                showInvisibleShip(cell.dataset.id);

                removeCellMark(cell.dataset.id);
                updateAdjacentMark();
            }
        });
    });
};

const removeCellMark = (id) => {
    const cellPlacedShip = document.querySelectorAll(
        `.temporary-board >div[data-id="${id}"]`
    );

    cellPlacedShip.forEach((cell) => {
        cell.removeAttribute("data-id");
        cell.removeAttribute("data-is-start");
        cell.removeAttribute("data-length");
        cell.removeAttribute("data-direction");
    });
};

const updateAdjacentMark = () => {
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

module.exports = {
    boardShipEvents,
    createGrabShip,
    placeShipOnBoard,
    removePlacedShipEvents,
};
