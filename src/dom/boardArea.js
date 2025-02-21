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

module.exports = createBoard;
