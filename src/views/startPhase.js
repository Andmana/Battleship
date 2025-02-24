const loadStartPhase = (callback) => {
    const main = document.querySelector(".main");
    main.innerHTML = `
        <div class="choose-opponents">
            <input
                hidden=""
                id="is-multiplayer"
                name="check"
                type="checkbox"
                disabled
            />
            <label class="toggle" for="is-multiplayer">
                <div class="toggle__circle">VS COM</div>
            </label>
            <div class="toggle-text">
                <div class="input-group">
                    <label for="player-p1">P1 NAME :</label
                    ><input id="player-p1" type="text" />
                </div>
                <div class="input-group">COMPUTER</div>
            </div>
        </div>

        <div>
            <button id="confirm">Confirm</button>
        </div>
    `;

    const confirm = document.querySelector("#confirm");
    const p1Name = document.querySelector("#player-p1");
    if (confirm && p1Name) {
        confirm.addEventListener("click", () => {
            callback(p1Name.value);
        });
    }
};

module.exports = loadStartPhase;
