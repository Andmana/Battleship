const StartPhase = require("./views/startPhase");
const Player = require("./models/Player");
const { SetUpPhase } = require("./views/setUpPhase");
const generateShips = require("./utils-random");
const PlayPhase = require("./views/playPhase");
const GameController = () => {
    const player = Player();
    const computer = Player("computer");
    computer.name = "Comp";
    let setUpPhase;
    let playPhase;

    const toSetUpPhase = (playerName) => {
        player.name = playerName;
        setUpPhase = SetUpPhase();
        setUpPhase.loadContent();
        setUpPhase.nextPhaseTrigger(toPlayPhase);
    };

    const toPlayPhase = (playerShipsCoord) => {
        player.newBoard();
        player.gameboard.placeShipBatch(playerShipsCoord);

        computer.newBoard();
        computer.gameboard.placeShipBatch(generateShips(5, 10));

        playPhase = PlayPhase();
        playPhase.loadContent(
            player.name,
            player.gameboard,
            computer.gameboard.ships
        );
    };

    const startphase = StartPhase();
    startphase.loadContent();
    startphase.nextPhaseTrigger(toSetUpPhase);
};

module.exports = GameController;
