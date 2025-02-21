const createBoard = () => {
    const areas = document.querySelectorAll(".area");
    areas.forEach((area) => {
        let innerHtml = "";
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                innerHtml += `<div data-row="${row}" data-col="${col}"></div>`;
            }
        }
        area.innerHTML = innerHtml;
    });
};

const createBoardBy = (board, selector) => {
    const area = document.querySelector(selector);
    let innerHtml = "";
    const setClass = (val) => (val === null ? "" : "red");
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            innerHtml += `
                <div 
                    class="${setClass(board[row][col])}" 
                    data-row="${row}" data-col="${col}">
                </div>
            `;
        }
    }
    area.innerHTML = innerHtml;
};

// Export both functions
module.exports = { createBoard, createBoardBy };
