import "./css/styles-format.css";
import "./css/styles.css";
import Ship from "./models/Ship";
const GameController = require("./GameController");

// console.log("Hi Webpack");

// const controller = GameController();

// const board = document.querySelector(".temporary-board");
// let innerhtml = "";
// for (let row = 0; row < 10; row++) {
//     for (let col = 0; col < 10; col++) {
//         innerhtml += '<div class="gameboard-cell"></div>';
//     }
// }
// board.innerHTML = innerhtml;
const generateEmptyBoard = (board) => {
    let innerhtml = "";
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            innerhtml += '<div class="gameboard-cell"></div>';
        }
    }
    board.innerHTML = innerhtml;
};

const boards = document.querySelectorAll(".gameboard");
boards.forEach((board) => {
    generateEmptyBoard(board);
});

const loadBoardContainer = () => {
    let borderNumber = "";
    for (let i = 0; i < 10; i++) {
        borderNumber += `<div>${i}</div>`;
    }

    const boardBorder = document.querySelectorAll(".gameboard-border");
    boardBorder.forEach((border) => {
        border.innerHTML = borderNumber;
    });
};

const loadShipAvatars = () => {
    console.log("aaa");
    const lengths = [2, 3, 3, 4, 5];
    let avatarsHTML = "";
    for (let i = 0; i < 5; i++) {
        let avatarShip = "";
        for (let num = 0; num < lengths[i]; num++) {
            avatarShip += `<div class="avatar-box"></div>`;
        }
        avatarsHTML += `<div data-id="${i + 1}">${avatarShip}</div>`;
    }

    const shipAvatars = document.querySelectorAll(".ship-avatars");
    shipAvatars.forEach((shipAvatar) => {
        shipAvatar.innerHTML = avatarsHTML;
    });
};

loadShipAvatars();

loadBoardContainer();
