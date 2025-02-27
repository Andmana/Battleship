const StartPhase = require("./views/startPhase");
const Player = require("./models/Player");
const { SetUpPhase } = require("./views/setUpPhase");
const generateShips = require("./utils-random");
const PlayPhase = require("./views/playPhase");
const GameController = () => {
    let player = Player();
    let computer = Player("computer");
    computer.name = "Comp";
    let setUpPhase;
    let playPhase;
    let isGameOver = false;

    const handlePlayerMove = (event) => {
        if (isGameOver) return;
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        playPhase.disableComBoardEvent();
        playPhase.setUpGameGuidance("Computer's turn");

        const isHit = computer.gameboard.receiveAttack(row, col);
        playPhase.setComCellClass(cell, isHit);

        if (computer.gameboard.allSunken()) {
            isGameOver = true;
            // playPhase.displayGameOverMessage(true);
            alert("Game Over");
            return;
        }

        if (!isHit) {
            setTimeout(computerMove, 500);
        } else {
            playPhase.enableComBoardEvent();
            playPhase.updateShipStatus(computer.gameboard.ships, "p2");
            playPhase.setUpGameGuidance(player.name + "'s turn");
        }
    };

    function computerMove() {
        if (isGameOver) return;

        let availableMoves = player.gameboard.retrieveAvailableAttackCord();
        if (availableMoves.length === 0) return;

        const [row, col] =
            availableMoves[Math.floor(Math.random() * availableMoves.length)];

        const isHit = player.gameboard.receiveAttack(row, col);
        playPhase.setPlayerCellClass(row, col, isHit);

        if (player.gameboard.allSunken()) {
            isGameOver = true;
            // displayGameOverMessage(false);
            alert("game over");
            return;
        }

        if (isHit) {
            setTimeout(computerMove, 500);
        } else {
            playPhase.enableComBoardEvent();
            playPhase.setUpGameGuidance(player.name + "'s turn");

            playPhase.updateShipStatus(player.gameboard.ships, "p1");
        }
    }

    const toSetUpPhase = (playerName) => {
        player.name = playerName;
        setUpPhase = SetUpPhase();
        setUpPhase.loadContent();
        setUpPhase.nextPhaseTrigger(toPlayPhase);
    };

    const toPlayPhase = (playerShipsCoord) => {
        player.gameboard.placeShipBatch(playerShipsCoord);
        computer.gameboard.placeShipBatch(generateShips(5, 10));

        playPhase = PlayPhase();
        playPhase.loadContent(
            player.name,
            player.gameboard,
            computer.gameboard.ships
        );

        playPhase.attachComBoardEvents(handlePlayerMove);
        playPhase.attachExitEvent(startPhase);
    };

    const startPhase = () => {
        player = Player();
        computer = Player("computer");
        const startphase = StartPhase();
        startphase.loadContent();
        startphase.nextPhaseTrigger(toSetUpPhase);
    };

    startPhase();
};

module.exports = GameController;
