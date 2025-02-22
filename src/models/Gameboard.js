const Ship = require("./Ship");

const Gameboard = (_dimension = 10) => {
    //
    const dimension = _dimension;
    const ships = [];
    const shipsOriginCoords = [];
    const placedShips = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(null));
    const attackedCoords = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(false));

    const allSunken = () => {
        const countSunken = ships.reduce(
            (count, ship) => (ship.isSunk() ? count + 1 : count),
            0
        );

        return countSunken === ships.length;
    };

    const placeShip = (shipLen, originRow, originCol, dir) => {
        const newShipCoords = callculateShipCoord(
            shipLen,
            originRow,
            originCol,
            dir
        );
        const isCrashWithOthers = newShipCoords.some(
            ([row, col]) => placedShips[row][col] !== null
        );
        if (isCrashWithOthers) throw new Error("Ship collide with other ships");

        const newShip = Ship(shipLen);
        let numOfShip = ships.push(newShip);
        shipsOriginCoords.push([originRow, originCol, dir]);

        newShipCoords.forEach(([row, col]) => {
            placedShips[row][col] = ships[numOfShip - 1];
        });
    };

    const placeShipBatch = (coords) => {
        coords.forEach((coord) => {
            const [len, row, col, dir] = coord;
            placeShip(len, row, col, dir);
        });
    };

    const callculateShipCoord = (shipLen, originRow, originCol, dir) => {
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
            if (originCol + shipLen - 1 >= dimension)
                throw new Error("Ship coordinates out of bonds");

            for (let i = 0; i < shipLen; i++)
                newShipCoords.push([originRow, originCol + i]);
        } else {
            if (originRow + shipLen - 1 >= dimension)
                throw new Error("Ship coordinates out of bonds");

            for (let i = 0; i < shipLen; i++)
                newShipCoords.push([originRow + i, originCol]);
        }
        return newShipCoords;
    };

    const receiveAttack = (row, col) => {
        // Small validation
        if (!Number.isInteger(row) || !Number.isInteger(col)) {
            throw new Error("Coord must be an integer");
        }
        if (row >= dimension || col >= dimension)
            throw new Error("Attack coord out of bonds");

        if (attackedCoords[row][col] === true)
            throw new Error("Area already attacked");

        attackedCoords[row][col] = true; // Update attack coord

        const attackedShip = placedShips[row][col];
        if (attackedShip === null) return false; // Miss

        attackedShip.hit(); // Attack hit an ship.
        return true;
    };

    const retrieveAvailableAttackCord = () => {
        let availableMoves = [];
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if (attackedCoords[row][col] === false)
                    availableMoves.push([row, col]);
            }
        }
        return availableMoves;
    };

    return {
        placedShips,
        attackedCoords,
        ships,
        shipsOriginCoords,
        allSunken,
        placeShip,
        placeShipBatch,
        receiveAttack,
        retrieveAvailableAttackCord,
    };
};

module.exports = Gameboard;
