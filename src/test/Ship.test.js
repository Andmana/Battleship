const Ship = require("../models/Ship");

describe("Ship Tests", () => {
    const ship = Ship(3);

    test("apply the correct length at instantiation", () => {
        expect(ship.length).toBe(3);
    });

    it("should be sunk when hitted with the same amount of length", () => {
        ship.hit();
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(false);

        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });

    it("throws error when hit sunken ship", () => {
        expect(() => ship.hit()).toThrow("Ship already sunken");
    });

    it("should throw an error when put invalid ship length", () => {
        expect(() => Ship("a")).toThrow("Ship length must be an integer");
        expect(() => Ship(10.2)).toThrow("Ship length must be an integer");
        expect(() => Ship(0)).toThrow("Ship length must be greater than 0");
        expect(() => Ship(-1)).toThrow("Ship length must be greater than 0");
    });
});
