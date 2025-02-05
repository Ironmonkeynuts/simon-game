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
}

// Export game file
module.exports = { game, newGame };