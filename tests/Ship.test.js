const Ship = require("../src/models/Ship");

describe("Ship Tests", () => {
    test("applies the correct length at instantiation", () => {
        const ship = Ship(3);
        expect(ship.getLength()).toBe(3);
    });
});
