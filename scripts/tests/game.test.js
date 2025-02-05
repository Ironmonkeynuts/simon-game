/**
 * @jest-environment jsdom
 */
// Connect test to game.js
const { game } = require("../game");


// Load index.html in jest
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// Function for testing for correct keys
describe("game object contains correct keys", () => {
    // Test if score exists
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    // Test if currentGame exists
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    // Test if playerMoves exists
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    // Test if choices exists
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    // Test if choices contains correct ids
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});