// ===== GAME STATE =====
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;
const winningScore = 20;

// ===== GET SCREEN ELEMENTS =====
const introScreen = document.getElementById('intro-screen');
const player1Screen = document.getElementById('player1-screen');
const player2Screen = document.getElementById('player2-screen');
const winnerScreen = document.getElementById('winner-screen');

// ===== GET BUTTON ELEMENTS =====
const startButton = document.querySelector('#intro-screen .game-button');
const rollDiceP1 = document.getElementById('roll-dice-p1');
const passTurnP1 = document.getElementById('pass-turn-p1');
const rollDiceP2 = document.getElementById('roll-dice-p2');
const passTurnP2 = document.getElementById('pass-turn-p2');
const playAgainButton = document.getElementById('play-again');

// ===== GET DICE AND SCORE ELEMENTS =====
const diceP1 = document.getElementById('dice');
const diceP2 = document.getElementById('dice2');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');
const winnerText = document.getElementById('winner-text');

// ===== HELPER FUNCTIONS =====

// Hide all screens
function hideAllScreens() {
    introScreen.classList.add('hidden');
    player1Screen.classList.add('hidden');
    player2Screen.classList.add('hidden');
    winnerScreen.classList.add('hidden');
}

// Show specific screen
function showScreen(screen) {
    hideAllScreens();
    screen.classList.remove('hidden');
}

// Roll dice and return random number 1-6
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// Update dice image
function updateDiceImage(diceElement, number) {
    diceElement.src = `images/dice-${number}.png`;
}

// Update score display
function updateScoreDisplays() {
    player1ScoreDisplay.textContent = player1Score;
    player2ScoreDisplay.textContent = player2Score;
}

// Check if there's a winner
function checkWinner() {
    if (player1Score >= winningScore) {
        winnerText.textContent = 'Player 1 Has Won!';
        showScreen(winnerScreen);
        return true;
    } else if (player2Score >= winningScore) {
        winnerText.textContent = 'Player 2 Has Won!';
        showScreen(winnerScreen);
        return true;
    }
    return false;
}

// Switch to next player
function switchPlayer() {
    if (currentPlayer === 1) {
        currentPlayer = 2;
        showScreen(player2Screen);
    } else {
        currentPlayer = 1;
        showScreen(player1Screen);
    }
}

// Reset game
function resetGame() {
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;
    updateScoreDisplays();
    updateDiceImage(diceP1, 1);
    updateDiceImage(diceP2, 1);
    showScreen(introScreen);
}

// ===== GAME LOGIC =====

// Start game
startButton.addEventListener('click', () => {
    showScreen(player1Screen);
    updateScoreDisplays();
});

// Player 1 - Roll Dice
rollDiceP1.addEventListener('click', () => {
    const diceValue = rollDice();
    updateDiceImage(diceP1, diceValue);
    
    if (diceValue === 1) {
        // Rolled a 1, lose turn automatically
        setTimeout(() => {
            alert('Oh no! You rolled a 1. Your turn is over!');
            switchPlayer();
        }, 300);
    } else {
        // Add to score
        player1Score += diceValue;
        updateScoreDisplays();
        
        // Check for winner
        if (checkWinner()) {
            return;
        }
    }
});

// Player 1 - Pass Turn
passTurnP1.addEventListener('click', () => {
    switchPlayer();
});

// Player 2 - Roll Dice
rollDiceP2.addEventListener('click', () => {
    const diceValue = rollDice();
    updateDiceImage(diceP2, diceValue);
    
    if (diceValue === 1) {
        // Rolled a 1, lose turn automatically
        setTimeout(() => {
            alert('Oh no! You rolled a 1. Your turn is over!');
            switchPlayer();
        }, 300);
    } else {
        // Add to score
        player2Score += diceValue;
        updateScoreDisplays();
        
        // Check for winner
        if (checkWinner()) {
            return;
        }
    }
});

// Player 2 - Pass Turn
passTurnP2.addEventListener('click', () => {
    switchPlayer();
});

// Play Again
playAgainButton.addEventListener('click', () => {
    resetGame();
});

// ===== INITIALIZE GAME =====
// Make sure only intro screen is visible on load
hideAllScreens();
showScreen(introScreen);