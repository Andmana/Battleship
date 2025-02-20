const Ship = require("./Ship");

const Gameboard = (_dimension = 8) => {
    const dimension = _dimension;
    let placedShips = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(null));

    let attackedAreas = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(false));

    let ships = [];

    const allSunken = () => {
        const countSunken = ships.reduce(
            (count, ship) => (ship.isSunk() ? count + 1 : count + 0),
            0
        );

        return countSunken === ships.length;
    };

    const getPlacedShips = () => placedShips;
    const getAttackedAreas = () => attackedAreas;
    const getShips = () => ships;

    const placeShip = (shipLen, originRow, originCol, dir) => {
        const newShipCoords = callculateShipCoord(
            shipLen,
            originRow,
            originCol,
            dir
        );
        const isCollide = newShipCoords.some(
            ([row, col]) => placedShips[row][col] !== null
        );
        if (isCollide) throw new Error("Ship collide with other ships");

        const newShip = Ship(shipLen);
        let countShips = ships.push(newShip);
        newShipCoords.forEach(([row, col]) => {
            placedShips[row][col] = countShips - 1;
        });
    };

    callculateShipCoord = (shipLen, originRow, originCol, dir) => {
        if (!(dir === "h" || dir === "v")) throw new Error("Invalid direction");
        if (
            originRow < 0 ||
            originRow >= dimension ||
            originCol < 0 ||
            originCol >= dimension
        )
            throw new Error("Coordinates out of bonds");
        const newShipCoords = [];
        if (dir === "h") {
            if (originCol + shipLen >= dimension)
                throw new Error("Ship coordinates out of bonds");

            for (let i = 0; i < shipLen; i++)
                newShipCoords.push([originRow, originCol + i]);
        } else {
            if (originRow + shipLen >= dimension)
                throw new Error("Ship coordinates out of bonds");

            for (let i = 0; i < shipLen; i++)
                newShipCoords.push([originRow + i, originCol]);
        }
        return newShipCoords;
    };

    const receiveAttack = (row, col) => {
        if (attackedAreas[row][col] === true)
            throw new Error("Area already attacked");
        attackedAreas[row][col] = true;

        const attackedShip = placedShips[row][col];
        // Miss
        if (attackedShip === null) return false;
        // Attack hit an ship.
        ships[attackedShip].hit();
        return true;
    };

    return {
        getPlacedShips,
        getAttackedAreas,
        getShips,
        allSunken,
        placeShip,
        receiveAttack,
    };
};

module.exports = Gameboard;
