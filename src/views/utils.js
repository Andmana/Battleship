const getCellBy = (selector, row, col) => {
    return document.querySelector(
        `${selector} > div[data-row="${row}"][data-col="${col}"]`
    );
};

module.exports = getCellBy;
