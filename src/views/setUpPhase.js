const loadSetUpPhase = (playerName) => {
const loadSetUpPhase = () => {
    document.querySelector(".header").classList.add("shrink");
    const main = document.querySelector(".main");
    main.innerHTML = `
        <div class="game-guidance">
            Place ships on board <br />
            Tap or type 'R' to ratate
        </div>
        <div class="set-up">
            <div class="unplaced-ships">
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 80px"
                ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 120px"
                ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 160px"
                ></div>
                <div
                    class="unplaced-ship drag-able"
                    style="height: 40px; width: 200px"
                ></div>
            </div>
            <div class="gameboard temporary-board"></div>
            <div class="set-up-actions">
                <button>Clear ships</button>
                <button>Place ships randomly</button>
                <button>Play Game</button>
            </div>
        </div>`;

    const board = document.querySelector(".temporary-board");
    if (board) {
        let boardHtml = "";
        for (let row = 0; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                boardHtml += `
                    <div class="gameboard-cell" data-row="${row}" data-row="${col}"></div>
                `;
            }
        }
        board.innerHTML = boardHtml;
    }
};

module.exports = loadSetUpPhase;
