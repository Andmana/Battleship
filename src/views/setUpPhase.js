const loadSetUpPhase = (playerName) => {
    document.querySelector(".header").classList.add("shrink");
    const main = document.querySelector(".main");
    main.innerHTML = `<h1> Place your damn ships  ${playerName}</h1>`;
};

module.exports = loadSetUpPhase;
