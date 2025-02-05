/**
 * @jest-environment jsdom
 */
// Connect test to game.js
const { game, newGame, showScore } = require("../game");


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
// Function for testing for correct values
describe("newGame works correctly", () => {
    // Set up before each test
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"]
        game.currentGame = ["button1", "button2"]
        document.getElementById("score").innerText = "42";
        newGame();
    });
    // Test if newGame resets score
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    // Test if newGame resets playerMoves
    test("should reset playerMoves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    // Test if newGame resets currentGame
    test("should reset currentGame array", () => {
        expect(game.currentGame.length).toEqual(0);
    });
    // Test if newGame displays 0 for the element with id of score
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
});