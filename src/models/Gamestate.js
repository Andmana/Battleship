const Player = require("./Player");
const { createBoardBy } = require("../dom/boardArea");
const botAreaEvents = require("../dom/eventListeners");

const Gamestate = (() => {
    const player = Player();
    const bot = Player("bot");

    let isGameOver = false;

    player.setGameBoard();
    bot.setGameBoard();

    const playerBoard = player.getBoard();
    const botBoard = bot.getBoard();

    const coords = [
        [2, 0, 2, "h"],
        [2, 9, 7, "h"],
        [3, 3, 2, "v"],
        [4, 5, 3, "v"],
        [5, 6, 4, "h"],
    ];

    coords.forEach((coord) => {
        const [len, row, col, dir] = coord;
        playerBoard.placeShip(len, row, col, dir);
        botBoard.placeShip(len, row, col, dir);
    });

    createBoardBy(playerBoard.getPlacedShips(), "#player-area");
    createBoardBy(botBoard.getPlacedShips(), "#bot-area");

    botAreaEvents(handlePlayerMove);

    function handlePlayerMove(event) {
        if (!isGameOver) {
            const coord = event.target;
            const row = coord.dataset.row;
            const col = coord.dataset.col;

            const isHit = botBoard.receiveAttack(row, col);
            if (isHit) {
                coord.classList.add("attack-hit");
                if (botBoard.allSunken()) {
                    isGameOver = true;
                    alert("Game Over");
                }
            } else {
                coord.classList.add("attack-miss");
                setTimeout(botMove, 500);
            }
        }
    }

    function botMove() {
        if (!isGameOver) {
            let availableMoves = [];
            const attackedAreas = playerBoard.getAttackedAreas();
            for (let row = 0; row < 10; row++) {
                for (let col = 0; col < 10; col++) {
                    if (attackedAreas[row][col] === false)
                        availableMoves.push([row, col]);
                }
            }
            const [randomMoveRow, randomMoveCol] =
                availableMoves[
                    Math.floor(Math.random() * availableMoves.length)
                ];
            const isHit = playerBoard.receiveAttack(
                randomMoveRow,
                randomMoveCol
            );

            const attackedDiv = document.querySelector(
                `#player-area > div[data-row="${randomMoveRow}"][data-col="${randomMoveCol}"]`
            );

            if (isHit) {
                attackedDiv.classList.add("attack-hit");
                setTimeout(botMove, 500);
            } else {
                attackedDiv.classList.add("attack-miss");
            }
        }
    }
})();

module.exports = Gamestate;
