const Gameboard = require("./Gameboard");

const Player = (_type = "Player", _name = null) => {
    let gameboard = Gameboard();
    let name = _name;
    const type = _type;

    const newBoard = () => {
        gameboard = Gameboard();
    };

    return {
        gameboard,
        type,
        name,
        newBoard,
    };
};

module.exports = Player;
