const {
    getVillainLosingLine,
    getVillainWinningLine,
    getHeroCounterLine,
    getHeroGetHitLine,
    getHeroNoDamageLine,
    getVillainNoDamageLine,
    getVillainCounterLine,
    shipImages,
} = require("./utils");

const loadBoard = (playerBoard, selector) => {
    const board = document.querySelector(`#${selector}-board`);
    let innerHtml = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            innerHtml += `
                <div 
                    class="${setClass(playerBoard[row][col], selector)}" 
                    data-row="${row}" data-col="${col}">
                </div>
            `;
        }
    }
    board.innerHTML = innerHtml;
};

const setClass = (val, selector) => {
    if (selector === "player" && val != null) return "white";
    return "";
};

const computerBoardEvents = (callback) => {
    const coords = document.querySelectorAll("#computer-board > div");
    coords.forEach((coord) => {
        coord.addEventListener("click", callback);
    });
};

const disableComBoardEvent = () => {
    const board = document.querySelector("#computer-board");
    board.style.pointerEvents = "none";
};

const enableComBoardEvent = () => {
    const board = document.querySelector("#computer-board");
    board.style.pointerEvents = "auto";
};

const setPlayerCoordClass = (row, col, isHit) => {
    const attackedDiv = document.querySelector(
        `#player-board > div[data-row="${row}"][data-col="${col}"]`
    );
    if (isHit) attackedDiv.classList.add("attack-hit");
    else attackedDiv.classList.add("attack-miss");
};

const setComCoordClass = (element, isHit) => {
    if (isHit) element.classList.add("attack-hit");
    else element.classList.add("attack-miss");
};

const displayGameOverMessage = (isPlayerWin) => {
    const dialog = document.querySelector("dialog");
    dialog.showModal();

    const result = document.querySelector("#message-result");
    const villainLines = document.querySelector("#last-words");
    if (isPlayerWin) {
        result.textContent = "Congratulations, You Wins";
        villainLines.textContent = getVillainLosingLine();
    } else {
        result.textContent = "Too bad, You Lose";
        villainLines.textContent = getVillainWinningLine();
    }
};

const setPlayerLine = (message) => {
    const box = document.querySelector("#player-msg  .message-box");

    if (message === "attack")
        box.innerHTML = `<div class="typed-out">${getHeroCounterLine()}</div>`;
    // else if (message === "no hit")
    //     box.innerHTML = `<div class="typed-out">${getHeroNoDamageLine()}</div>`;
    // else if (message === "attacked")
    //     box.innerHTML = `<div class="typed-out">${getHeroGetHitLine()}</div>`;
};

const setComputerLine = (message) => {
    const box = document.querySelector("#computer-msg  .message-box");

    if (message === "attack")
        box.innerHTML = `<div class="typed-out">${getVillainCounterLine()}</div>`;
    // else if (message === "no hit")
    //     box.innerHTML = `<div class="typed-out">${getVillainNoDamageLine()}</div>`;
    // else if (message === "attacked")
    //     box.innerHTML = `<div class="typed-out">${getVillainGetHitLine()}</div>`;
};

const dialogRender = () => {
    const dialog = document.querySelector("dialog");
    const closeButton = document.querySelector("dialog button");

    // "Close" button closes the dialog
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    // "Show the dialog" button opens the dialog modally
    const showButton = document.querySelector("#showDialog");
    showButton.addEventListener("click", () => {
        dialog.showModal();
    });
};

const displayShips = (ships, playerType) => {
    const lengthIds = [];
    ships.forEach((ship, index) => {
        lengthIds.push([ship.length, index]);
    });
    lengthIds.sort((a, b) => a[0] - b[0]);

    const shipsContainer = document.querySelector(`#${playerType}-area .ships`);
    shipsContainer.innerHTML = "";
    lengthIds.forEach(([length, id]) => {
        const ship = document.createElement("img");
        ship.className = `ship-icon ship-${length}`;
        ship.dataset.index = id;
        ship.src = shipImages[length];
        shipsContainer.appendChild(ship);
    });
};

const updateShipStatus = (ships, playerType) => {
    ships.forEach((ship, index) => {
        if (ship.isSunk())
            document.querySelector(
                `#${playerType}-area .ships > img[data-index="${index}"]`
            ).className = `ship-icon ship-${ship.length} ship-is-sunk`;
    });
};

module.exports = {
    dialogRender,
    loadBoard,
    computerBoardEvents,
    disableComBoardEvent,
    enableComBoardEvent,
    setPlayerCoordClass,
    setComCoordClass,
    setComputerLine,
    setPlayerLine,
    displayGameOverMessage,
    displayShips,
    updateShipStatus,
};
