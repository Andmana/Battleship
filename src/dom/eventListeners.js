const botAreaEvents = (callback) => {
    const areas = document.querySelectorAll("#bot-area > div");
    areas.forEach((area) => {
        area.addEventListener("click", callback);
    });
};

module.exports = botAreaEvents;
