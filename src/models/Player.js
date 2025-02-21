const Gameboard = require("./Gameboard");

const Player = (_type = "Player") => {
    let gameboard;
    const type = _type;
    const setGameBoard = (dimension) => Gameboard(dimension);
    return {
        setGameBoard,
    };
};
