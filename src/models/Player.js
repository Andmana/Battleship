const Gameboard = require("./Gameboard");

const Player = (_type = "Player", _name = null) => {
    let gameboard = Gameboard();
    let name = _name;
    const type = _type;

    return {
        gameboard,
        type,
        name,
    };
};

module.exports = Player;
