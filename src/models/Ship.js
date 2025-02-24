const Ship = (_length) => {
    //
    // Simple validation
    if (!Number.isInteger(_length)) {
        throw new Error("Ship length must be an integer");
    }
    if (_length < 1) {
        throw new Error("Ship length must be greater than 0");
    }

    let length = _length;
    let hitCount = 0;

    const hit = () => {
        if (isSunk()) throw new Error("Ship already sunken");
        hitCount += 1;
    };

    const isSunk = () => {
        return hitCount >= length;
    };

    return {
        hit,
        isSunk,
        length,
        hitCount,
    };
};

module.exports = Ship;
