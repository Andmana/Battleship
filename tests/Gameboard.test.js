const Gameboard = require("../src/models/Gameboard");

describe.skip("Test Gameboard", () => {
    const gameboard = Gameboard(10);
    it("should create board", () => {
        expect(gameboard.ships).toEqual([]);
    });

    test("should place all ships", () => {
        // Put ships
        gameboard.placeShip(2, 0, 0, "h");
        gameboard.placeShip(3, 1, 1, "v");

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
        expect(gameboard.receiveAttack(1, 1)).toBe(true);
        expect(gameboard.receiveAttack(2, 1)).toBe(true);
        expect(gameboard.receiveAttack(3, 1)).toBe(true);
        expect(gameboard.allSunken()).toBe(true);
    });
});

describe("Test invalid input", () => {
    const gameboard = Gameboard(10);
    it("should throw an error when coordinates out of bonds", () => {
        expect(() => gameboard.placeShip(2, -1, 0, "h")).toThrow(
            "Coordinates out of bonds"
        );
        expect(() => gameboard.placeShip(2, 0, -1, "h")).toThrow(
            "Coordinates out of bonds"
        );
        expect(() => gameboard.placeShip(2, 0, 10, "h")).toThrow(
            "Coordinates out of bonds"
        );
    });

    it("should throw an error when put wrong direction", () => {
        expect(() => gameboard.placeShip(2, 0, 0, "a")).toThrow(
            "Invalid direction"
        );
        expect(() => gameboard.placeShip(2, 0, 0, "b")).toThrow(
            "Invalid direction"
        );
    });

    it("should throw an error when ship outside board", () => {
        expect(() => gameboard.placeShip(5, 9, 8, "h")).toThrow(
            "Ship coordinates out of bonds"
        );
        expect(() => gameboard.placeShip(8, 5, 4, "v")).toThrow(
            "Ship coordinates out of bonds"
        );
    });

    it("Collide when ship overlap", () => {
        gameboard.placeShip(3, 0, 0, "h");
        gameboard.placeShip(5, 1, 1, "v");

        expect(() => gameboard.placeShip(3, 0, 2, "h")).toThrow(
            "Ship collide with other ships"
        );
        expect(() => gameboard.placeShip(4, 2, 1, "v")).toThrow(
            "Ship collide with other ships"
        );
    });
});
