// Define current game and score
let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    // Reset game
    game.currentGame = [];
    game.score = 0;
    game.playerMoves = [];
    showScore();
    addTurn();
}

function addTurn() {
    //Clear playerMoves
    game.playerMoves = [];
    // Add random button to game
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
}

function showScore() {
    // Display score
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    // Add class to button
    document.getElementById(circ).classList.add("light");
    // Remove class after 400ms
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

// Export game file
module.exports = { game, newGame, showScore, addTurn, lightsOn };