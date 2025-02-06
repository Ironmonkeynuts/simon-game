// Define current game and score
let game = {
    currentGame: [],
    score: 0,
    playerMoves: [],
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    // Reset game
    game.currentGame = [];
    game.score = 0;
    game.playerMoves = [];
    // Loop data-listener for circles
    for (let circle of document.getElementsByClassName("circle")) {
        if (circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                if (game.currentGame.length > 0) {
                    let move = e.target.getAttribute("id");
                    game.playerMoves.push(move);
                    lightsOn(move);
                    playerTurn();
                }
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    //Clear playerMoves
    game.playerMoves = [];
    // Add random button to game
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    // Show turns
    showTurns();
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

function showTurns() {
    // Show turns
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
};

// Export game file
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns };