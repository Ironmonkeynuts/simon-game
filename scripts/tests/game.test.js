/**
 * @jest-environment jsdom
 */
// Connect test to game.js
const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation(() => { });

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
    // Test if turnNumber exists
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
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
    // Test if only one move
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    // Test if newGame displays 0 for the element with id of score
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    // Test if expect data-listener to be true
    test("expect data-listener to be true", () => {
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe("game works correctly", () => {
    // Set up before each test
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    // Reset after each test
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];  
    });
    // Test if addTurn adds a new turn to the game
    test("addTurn should add a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    // Test if addTurn adds a new turn to the playerMoves
    test("should add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
    // Test if showTurns works correctly
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    // Test if score is incremented
    test("should increment the score if the player turns is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
    // Test if alert is called
    test("should call an alert if the player moves wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
});