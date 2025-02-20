const Ship = (_length) => {
    if (!Number.isInteger(_length)) throw new Error("Ship length must be number");
    if (_length < 1) throw new Error("Ship length must be greater than 0");

    let length = _length;
    let hits = 0;

    const hit = () => {
        if (isSunk) throw new Error("Ship already sunked");

        hits += 1;
        if (isSunk()) isSunk = true;
    };

    const isSunk = () => {
        return hits === length;
    };

    const getLength = () => length;

    return {
        hit,
        isSunk,
        getLength,
    };
};

module.exports = Ship;
