const Gameboard = require("../models/Gameboard");

describe("Test Gameboard", () => {
    const gameboard = Gameboard(10);
    it("should create board", () => {
        expect(gameboard.ships).toEqual([]);
    });

    test("should place all ships", () => {
        // Put ships
        gameboard.placeShip(2, 0, 0, "h");
        gameboard.placeShip(3, 2, 1, "v");

        expect(gameboard.ships[0].length).toBe(2);
        expect(gameboard.ships[1].length).toBe(3);
        expect(gameboard.allSunken()).toBe(false);
    });

    test("beat all of ships, therefor all sunken", () => {
        expect(gameboard.receiveAttack(5, 5)).toBe(false);
        expect(gameboard.receiveAttack(0, 5)).toBe(false);

        // Ship 0 -> true hit -> false miss
        expect(gameboard.receiveAttack(0, 0)).toBe(true);
        expect(gameboard.allSunken()).toBe(false);
        // ship 0
        expect(gameboard.receiveAttack(0, 1)).toBe(true);
        // ship 1
        expect(gameboard.receiveAttack(2, 1)).toBe(true);
        expect(gameboard.receiveAttack(3, 1)).toBe(true);
        expect(gameboard.receiveAttack(4, 1)).toBe(true);
        expect(gameboard.allSunken()).toBe(true);
    });

    test("Remove ships", () => {
        // ship 2
        gameboard.placeShip(3, 2, 5, "v");
        expect(gameboard.allSunken()).toBe(false);
        gameboard.removeShip({ id: 3 });
        expect(gameboard.allSunken()).toBe(true);
    });
});

describe("Test invalid input", () => {
    const gameboard = Gameboard(10);
    it("should throw an error when coordinates out of bonds", () => {
        expect(() => gameboard.placeShip(2, -1, 0, "h")).toThrow(
            "Invalid : Ship origin coordinates out of bonds"
        );
        expect(() => gameboard.placeShip(2, 0, -1, "h")).toThrow(
            "Invalid : Ship origin coordinates out of bonds"
        );
        expect(() => gameboard.placeShip(2, 0, 10, "h")).toThrow(
            "Invalid : Ship origin coordinates out of bonds"
        );
    });

    it("should throw an error when put wrong direction", () => {
        expect(() => gameboard.placeShip(2, 0, 0, "a")).toThrow(
            'Invalid : Ship direction must be "h" or "v"'
        );
        expect(() => gameboard.placeShip(2, 0, 0, "b")).toThrow(
            'Invalid : Ship direction must be "h" or "v"'
        );
    });

    it("should throw an error when ship outside board", () => {
        expect(() => gameboard.placeShip(5, 9, 8, "h")).toThrow(
            "Calculated origin coordinates and length are out of bounds."
        );
        expect(() => gameboard.placeShip(8, 5, 4, "v")).toThrow(
            "Calculated origin coordinates and length are out of bounds."
        );
    });

    it("Collide when ship overlap", () => {
        gameboard.placeShip(3, 0, 0, "h");
        gameboard.placeShip(4, 2, 1, "v");

        expect(() => gameboard.placeShip(3, 0, 2, "h")).toThrow(
            "Ship collides with other ships or adjacent objects."
        );
        expect(() => gameboard.placeShip(2, 6, 1, "v")).toThrow(
            "Ship collides with other ships or adjacent objects."
        );
    });
});
