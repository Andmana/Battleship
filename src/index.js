import { dialogRender } from "./renderUI";
import "./css/styles.css";
import "./css/styles-reset.css";
console.log("Hi Webpack");
// const Gamestate = require("./models/Gamestate");

const gameController = require("./gameController");

gameController();
dialogRender();
