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

module.exports = {
    loadBoard,
    computerBoardEvents,
    disableComBoardEvent,
    enableComBoardEvent,
    setPlayerCoordClass,
    setBotCoordClass,
};
