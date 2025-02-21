const Gameboard = require("./Gameboard");

const Player = (_type = "Player") => {
    let gameboard;
    const type = _type;
    const setGameBoard = () => (gameboard = Gameboard());
    const getBoard = () => gameboard;
    const getType = () => type();
    return {
        setGameBoard,
        getBoard,
        getType,
    };
};

module.exports = Player;
