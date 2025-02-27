import "./css/styles-format.css";
import "./css/styles.css";
const GameController = require("./GameController");

const controller = GameController();

document.addEventListener("DOMContentLoaded", () => {
    const dialog = document.querySelector("dialog");

    const closeButton = document.querySelector("dialog .close");
    closeButton.addEventListener("click", () => {
        dialog.close();
    });

    const exitButton = document.querySelector("dialog .exit");
    exitButton.addEventListener("click", () => {
        controller.startPhase();
        dialog.close();
    });
});
