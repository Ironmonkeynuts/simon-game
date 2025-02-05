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
    // Test if game score exists
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    // Test if current game exists
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
});


