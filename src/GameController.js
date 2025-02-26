const StartPhase = require("./views/startPhase");
const Player = require("./models/Player");
const { SetUpPhase } = require("./views/setUpPhase");
const generateShips = require("./utils-random");
const GameController = () => {
    const player = Player();
    const computer = Player("computer");
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
        computer.gameboard.placeShipBatch(generateShips(5, this.length));
    };

    const startphase = StartPhase();
    startphase.loadContent();
    startphase.nextPhaseTrigger(toSetUpPhase);
};

module.exports = GameController;
