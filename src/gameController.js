const Player = require("./models/Player");
const {
    loadBoard,
    disableComBoardEvent,
    enableComBoardEvent,
    computerBoardEvents,
    setPlayerCoordClass,
    setBotCoordClass,
} = require("./renderUI");

const gameController = () => {
    let isGameOver = false;
    const computer = Player("Comp");
    const player = Player();

    const shipsCoords = [
        [2, 0, 2, "h"],
        [2, 9, 7, "h"],
        [3, 3, 2, "v"],
        [4, 5, 3, "v"],
        [5, 6, 4, "h"],
    ];

    //Placed ship on board
    shipsCoords.forEach((coord) => {
        const [len, row, col, dir] = coord;
        player.gameboard.placeShip(len, row, col, dir);
        computer.gameboard.placeShip(len, row, col, dir);
    });

    // Load/generate board ui
    loadBoard(player.gameboard.placedShips, "player");
    loadBoard(computer.gameboard.placedShips, "bot");

    const handlePlayerMove = (event) => {
        if (isGameOver) return;

        const coord = event.target;
        const row = parseInt(coord.dataset.row);
        const col = parseInt(coord.dataset.col);

        disableComBoardEvent();

        const isHit = computer.gameboard.receiveAttack(row, col);
        setBotCoordClass(coord, isHit);

        if (computer.gameboard.allSunken()) {
            isGameOver = true;
            // displayGameOverMessage("Player wins");
            return;
        }

        if (!isHit) setTimeout(computerMove, 500);
        else enableComBoardEvent();
    };

    function computerMove() {
        if (isGameOver) return;

        let availableMoves = player.gameboard.retrieveAvailableAttackCord();
        if (availableMoves.length === 0) return;

        const [row, col] =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];

        const isHit = player.gameboard.receiveAttack(row, col);
        setPlayerCoordClass(row, col, isHit);

        if (player.gameboard.allSunken()) {
            isGameOver = true;
            // displayGameOverMessage("Computer wins");
            return;
        }

        if (isHit) setTimeout(computerMove, 500);
        else enableComBoardEvent();
    }

    // attach events on computer board
    computerBoardEvents(handlePlayerMove);
};

module.exports = gameController;
