const {
    getVillainLosingLine,
    getVillainWinningLine,
    getHeroCounterLine,
    getHeroGetHitLine,
    getHeroNoDamageLine,
    getVillainNoDamageLine,
    getVillainCounterLine,
} = require("./utils");

const loadBoard = (board, selector) => {
    const area = document.querySelector(`#${selector}-area`);
    let innerHtml = "";

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            innerHtml += `
                <div 
                    class="${setClass(board[row][col], selector)}" 
                    data-row="${row}" data-col="${col}">
                </div>
            `;
        }
    }
    area.innerHTML = innerHtml;
};

const setClass = (val, selector) => {
    if (selector === "player" && val != null) return "white";
    return "";
};

const computerBoardEvents = (callback) => {
    const coords = document.querySelectorAll("#bot-area > div");
    coords.forEach((coord) => {
        coord.addEventListener("click", callback);
    });
};

const disableComBoardEvent = () => {
    const board = document.querySelector("#bot-area");
    board.style.pointerEvents = "none";
};

const enableComBoardEvent = () => {
    const board = document.querySelector("#bot-area");
    board.style.pointerEvents = "auto";
};

const setPlayerCoordClass = (row, col, isHit) => {
    const attackedDiv = document.querySelector(
        `#player-area > div[data-row="${row}"][data-col="${col}"]`
    );
    if (isHit) attackedDiv.classList.add("attack-hit");
    else attackedDiv.classList.add("attack-miss");
};

const setBotCoordClass = (element, isHit) => {
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
    else if (message === "no hit")
        box.innerHTML = `<div class="typed-out">${getHeroNoDamageLine()}</div>`;
    else if (message === "attacked")
        box.innerHTML = `<div class="typed-out">${getHeroGetHitLine()}</div>`;
};

const setComputerLine = (message) => {
    const box = document.querySelector("#computer-msg  .message-box");

    if (message === "attack")
        box.innerHTML = `<div class="typed-out">${getVillainCounterLine()}</div>`;
    else if (message === "no hit")
        box.innerHTML = `<div class="typed-out">${getVillainNoDamageLine()}</div>`;
    else if (message === "attacked")
        box.innerHTML = `<div class="typed-out">${getVillainGetHitLine()}</div>`;
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

module.exports = {
    dialogRender,
    loadBoard,
    computerBoardEvents,
    disableComBoardEvent,
    enableComBoardEvent,
    setPlayerCoordClass,
    setBotCoordClass,
    setComputerLine,
    setPlayerLine,
    displayGameOverMessage,
};
