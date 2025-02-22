import "./css/styles.css";
import "./css/styles-reset.css";
import { dialogRender, loadTempBoard, setStartEvent } from "./renderUI";
console.log("Hi Webpack");
// const Gamestate = require("./models/Gamestate");

const gameController = require("./gameController");

const controller = gameController();
dialogRender();
loadTempBoard();
