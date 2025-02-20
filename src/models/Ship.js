const Ship = (_length) => {
    if (!Number.isInteger(_length)) throw new Error("Ship length must be an integer");
    if (_length < 1) throw new Error("Ship length must be greater than 0");

    let length = _length;
    let hits = 0;

    const hit = () => {
        if (isSunk()) throw new Error("Ship already sunken");
        hits += 1;
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
