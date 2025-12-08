let currentPlayer = 1;
let player1Total = 0;
let player2Total = 0;
let isRolling = false;
const winningScore = 20;

function startGame() {
    hideAllScreens();
    document.getElementById('player1Screen').classList.add('active');
    currentPlayer = 1;
    player1Total = 0;
    player2Total = 0;
    isRolling = false;
    updateScores();
    
    // Enable Player 1 buttons
    document.getElementById('roll1').disabled = false;
    document.getElementById('pass1').disabled = false;
}

function hideAllScreens() {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
}

function rollDice(player) {
    if (isRolling || player !== currentPlayer) return;
    
    isRolling = true;
    const diceElement = document.getElementById(`dice${player}`);
    const rollButton = document.getElementById(`roll${player}`);
    const passButton = document.getElementById(`pass${player}`);
    
    rollButton.disabled = true;
    passButton.disabled = true;
    diceElement.classList.add('rolling');

    let rollCount = 0;
    const rollInterval = setInterval(() => {
        const randomDice = Math.floor(Math.random() * 6) + 1;
        diceElement.src = `images/dice-${randomDice}.png`;
        rollCount++;
        
        if (rollCount >= 10) {
            clearInterval(rollInterval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            diceElement.src = `images/dice-${finalRoll}.png`;
            diceElement.classList.remove('rolling');
            
            if (finalRoll === 1) {
                // Rolled a 1 (no sushi) - LOSE ALL POINTS and pass to next player
                if (currentPlayer === 1) {
                    player1Total = 0;
                } else {
                    player2Total = 0;
                }
                updateScores();
                
                // Show "No Sushi" popup
                showNoSushiPopup();
                
                setTimeout(() => {
                    switchPlayer();
                    isRolling = false;
                }, 2500);
            } else {
                // Add points directly to score
                if (currentPlayer === 1) {
                    player1Total += finalRoll;
                } else {
                    player2Total += finalRoll;
                }
                updateScores();
                
                // Check if player won
                if (checkWinner()) {
                    isRolling = false;
                    return;
                }
                
                rollButton.disabled = false;
                passButton.disabled = false;
                isRolling = false;
            }
        }
    }, 100);
}

function passTurn(player) {
    if (player !== currentPlayer) return;
    
    // Just switch to the other player
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    
    hideAllScreens();
    document.getElementById(`player${currentPlayer}Screen`).classList.add('active');
    
    const rollButton = document.getElementById(`roll${currentPlayer}`);
    const passButton = document.getElementById(`pass${currentPlayer}`);
    rollButton.disabled = false;
    passButton.disabled = false;
}

function updateScores() {
    // Update all score displays
    document.getElementById('player1ScoreDisplay').textContent = player1Total;
    document.getElementById('player2ScoreDisplay1').textContent = player2Total;
    document.getElementById('player1ScoreDisplay2').textContent = player1Total;
    document.getElementById('player2ScoreDisplay').textContent = player2Total;
}

function checkWinner() {
    if (player1Total >= winningScore) {
        setTimeout(() => showWinner(1), 500);
        return true;
    } else if (player2Total >= winningScore) {
        setTimeout(() => showWinner(2), 500);
        return true;
    }
    return false;
}

function showWinner(player) {
    hideAllScreens();
    document.getElementById(`winner${player}Screen`).classList.add('active');
}

function restartGame() {
    hideAllScreens();
    document.getElementById('startScreen').classList.add('active');
    player1Total = 0;
    player2Total = 0;
    currentPlayer = 1;
    isRolling = false;
    updateScores();
}

// Popup Functions
function showNoSushiPopup() {
    const popup = document.getElementById('noSushiPopup');
    popup.classList.add('active');
    setTimeout(() => {
        popup.classList.remove('active');
    }, 2000);
}

function showHowToPlay() {
    document.getElementById('howToPlayPopup').classList.add('active');
}

function closeHowToPlay() {
    document.getElementById('howToPlayPopup').classList.remove('active');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Start button
    document.getElementById('startButton').addEventListener('click', startGame);
    
    // Player 1 buttons
    document.getElementById('roll1').addEventListener('click', () => rollDice(1));
    document.getElementById('pass1').addEventListener('click', () => passTurn(1));
    
    // Player 2 buttons
    document.getElementById('roll2').addEventListener('click', () => rollDice(2));
    document.getElementById('pass2').addEventListener('click', () => passTurn(2));
    
    // Restart buttons
    document.getElementById('restart1Button').addEventListener('click', restartGame);
    document.getElementById('restart2Button').addEventListener('click', restartGame);
    
    // How to Play popup buttons
    document.getElementById('howToPlayButton').addEventListener('click', showHowToPlay);
    document.getElementById('closeHowToPlay').addEventListener('click', closeHowToPlay);
    
    // Close popup when clicking outside
    document.getElementById('howToPlayPopup').addEventListener('click', (e) => {
        if (e.target.id === 'howToPlayPopup') {
            closeHowToPlay();
        }
    });
});