const Gameboard = require("../src/models/Gameboard");

describe("Test Gameboard", () => {
    const gameboard = Gameboard(10);
    it("should create board", () => {
        expect(gameboard.getShips()).toEqual([]);
    });

    const ships = gameboard.getShips();
    test("should place all ships", () => {
        gameboard.placeShip(2, 0, 0, "h");
        gameboard.placeShip(3, 1, 1, "v");
        const ships = gameboard.getShips();
        expect(ships[0].getLength()).toBe(2);
        expect(ships[1].getLength()).toBe(3);
        expect(gameboard.allSunken()).toBe(false);
    });

    test("hit ships, therefor get sunk", () => {
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

describe.skip("Test invalid input", () => {
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
        console.log(gameboard.getPlacedShips());

        expect(() => gameboard.placeShip(3, 0, 2, "h")).toThrow(
            "Ship collide with other ships"
        );
        expect(() => gameboard.placeShip(4, 2, 1, "v")).toThrow(
            "Ship collide with other ships"
        );
    });
});
