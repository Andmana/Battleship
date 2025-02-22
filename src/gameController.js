const Player = require("./models/Player");
const generateShips = require("./random");
const {
    loadBoard,
    disableComBoardEvent,
    enableComBoardEvent,
    computerBoardEvents,
    setPlayerCoordClass,
    setComCoordClass,
    displayGameOverMessage,
    setPlayerLine,
    setComputerLine,
    displayShips,
    updateShipStatus,
    displayShipsOnBoard,
    setStartEvent,
} = require("./renderUI");

const gameController = () => {
    let isGameOver = false;
    const computer = Player("Comp");
    const player = Player();

    const initiateGame = () => {};

    const playGame = () => {
        // Load/generate board ui
        player.gameboard.placeShipBatch(generateShips(5, 10));
        loadBoard(player.gameboard.placedShips, "player");
        displayShips(player.gameboard.ships, "player");
        displayShipsOnBoard(
            player.gameboard.shipsOriginCoords,
            player.gameboard.ships
        );

        computer.gameboard.placeShipBatch(generateShips(5, 10));
        loadBoard(computer.gameboard.placedShips, "computer");
        displayShips(computer.gameboard.ships, "computer");

        computerBoardEvents(handlePlayerMove);
    };

    setStartEvent(playGame);

    const handlePlayerMove = (event) => {
        if (isGameOver) return;

        const coord = event.target;
        const row = parseInt(coord.dataset.row);
        const col = parseInt(coord.dataset.col);

        disableComBoardEvent();
        setPlayerLine("attack");

        const isHit = computer.gameboard.receiveAttack(row, col);
        setComCoordClass(coord, isHit);

        if (computer.gameboard.allSunken()) {
            isGameOver = true;
            displayGameOverMessage(true);
            return;
        }

        if (!isHit) {
            setTimeout(computerMove, 1500);
        } else {
            enableComBoardEvent();
            updateShipStatus(computer.gameboard.ships, "computer");
        }
    };

    function computerMove() {
        if (isGameOver) return;

        let availableMoves = player.gameboard.retrieveAvailableAttackCord();
        if (availableMoves.length === 0) return;

        const [row, col] =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];
        setComputerLine("attack");

        const isHit = player.gameboard.receiveAttack(row, col);
        setPlayerCoordClass(row, col, isHit);

        if (player.gameboard.allSunken()) {
            isGameOver = true;
            displayGameOverMessage(false);
            return;
        }

        if (isHit) {
            setTimeout(computerMove, 1500);
        } else {
            enableComBoardEvent();
            updateShipStatus(player.gameboard.ships, "player");
        }
    }

    return {
        playGame,
    };

    // attach events on computer board
};

module.exports = gameController;
