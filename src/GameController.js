const loadStartPhase = require("./views/startPhase");
const Player = require("./models/Player");
const loadSetUpPhase = require("./views/setUpPhase");
const GameController = () => {
    const player = Player();
    const computer = Player("computer");

    const setUpGame = (playerName) => {
        player.name = playerName;
        loadSetUpPhase(playerName);
    };
    loadStartPhase(setUpGame);
};

module.exports = GameController;
