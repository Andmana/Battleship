const { ids } = require("webpack");
const Ship = require("./Ship");

const Gameboard = (_dimension = 10) => {
    //
    const dimension = _dimension;
    const ships = [];
    const shipsMap = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(null));
    const attacksMap = new Array(dimension)
        .fill(null)
        .map(() => new Array(dimension).fill(false));

    const allSunken = () => {
        const countSunken = ships.reduce(
            (count, ship) => (ship.isSunk() ? count + 1 : count),
            0
        );

        return countSunken === ships.length;
    };

    const addShip = (length) => {
        const newShip = Ship(length);
        const newId = ships.push(newShip);
        newShip.id = newShip - 1;
        return newShip;
    };

    const placeShip = (shipLen, originRow, originCol, dir) => {
        const newShipCoords = calculateShipCoord(
            shipLen,
            originRow,
            originCol,
            dir
        );

        if (crashWithOthers(shipsMap, newShipCoords))
            throw new Error(
                "Ship collides with other ships or adjacent objects."
            );

        const newShip = addShip(shipLen);
        newShipCoords.forEach(([row, col]) => {
            shipsMap[row][col] = newShip;
        });
    };

    const placeShipBatch = (coords) => {
        coords.forEach((coord) => {
            const [len, row, col, dir] = coord;
            placeShip(len, row, col, dir);
        });
    };

    const removeShip = (ship) => {
        const indexShip = ships.findIndex((a) => a.id === ship.id);
        ships.splice(indexShip, 1);
        ships.map((a, index) => (a.id = index));
    };

    const receiveAttack = (row, col) => {
        if (!Number.isInteger(row) || !Number.isInteger(col)) {
            throw new Error("Invalid : Attack coordinates must be an integer");
        }
        if (row < 0 || col < 0 || row >= dimension || col >= dimension)
            throw new Error("Invalid : Attack coordinates out of bonds");

        if (attacksMap[row][col] === true)
            throw new Error("This area has already been attacked");

        attacksMap[row][col] = true; // Update attack coord

        const attackedShip = shipsMap[row][col];
        if (attackedShip === null) return false; // Miss

        attackedShip.hit(); // Attack hit an ship.
        return true;
    };

    const retrieveAvailableAttackCord = () => {
        return attackedCoords
            .flatMap((rowArr, row) =>
                rowArr.map((attacked, col) => (!attacked ? [row, col] : null))
            )
            .filter((coord) => coord !== null);
    };

    return {
        shipsMap,
        attacksMap,
        ships,
        allSunken,
        placeShip,
        placeShipBatch,
        removeShip,
        receiveAttack,
        retrieveAvailableAttackCord,
    };
};

const crashWithOthers = (board, coords) => {
    const adjacents = [
        [-1, -1],
        [-1, 0],
        [-1, 1], // Atas
        [0, -1],
        [0, 1], // Kiri & Kanan
        [1, -1],
        [1, 0],
        [1, 1], // Bawah
    ];

    for (const [row, col] of coords) {
        if (board[row][col] !== null) return true;

        for (const [dr, dc] of adjacents) {
            const r = row + dr,
                c = col + dc;
            if (r >= 0 && r < board.length && c >= 0 && c < board[0].length) {
                if (board[r][c] !== null) return true;
            }
        }
    }
    return false;
};

const calculateShipCoord = (
    shipLen,
    originRow,
    originCol,
    dir,
    dimension = 10
) => {
    if (!(dir === "h" || dir === "v"))
        throw new Error('Invalid : Ship direction must be "h" or "v"');
    if (
        originRow < 0 ||
        originRow >= dimension ||
        originCol < 0 ||
        originCol >= dimension
    )
        throw new Error("Invalid : Ship origin coordinates out of bonds");
    const newShipCoords = [];
    if (dir === "h") {
        if (originCol + shipLen - 1 >= dimension)
            throw new Error(
                "Calculated origin coordinates and length are out of bounds."
            );

        for (let i = 0; i < shipLen; i++)
            newShipCoords.push([originRow, originCol + i]);
    } else {
        if (originRow + shipLen - 1 >= dimension)
            throw new Error(
                "Calculated origin coordinates and length are out of bounds."
            );

        for (let i = 0; i < shipLen; i++)
            newShipCoords.push([originRow + i, originCol]);
    }
    return newShipCoords;
};

module.exports = Gameboard;
