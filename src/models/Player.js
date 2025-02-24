const Gameboard = require("./Gameboard");

const Player = (_type = "Player") => {
    let gameboard = Gameboard();
    const type = _type;

    return {
        gameboard,
        type,
    };
};

module.exports = Player;
