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
            boardCell.appendChild(placedShip);

            clearHoverEffect();
        } else {
            document.querySelector(".invisible").classList.remove("invisible");
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

        for (let i = 0; i < length; i++) {
            let targetCell;
            if (direction === "h") {
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
                targetCell.classList.add(hoverClass);
                lastHoveredCells.push(targetCell);
            }
        }
    };

    const clearHoverEffect = () => {
        lastHoveredCells.forEach((cell) =>
            cell.classList.remove("place-valid", "place-invalid")
        );
        lastHoveredCells = [];
    };
};

const createGrabShip = (id, _length, direction) => {
    const length = parseInt(_length);
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

module.exports = drag;
