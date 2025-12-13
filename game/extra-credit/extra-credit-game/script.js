// IIFE to keep code contained
(function() {
    "use strict";
    console.log("reading js");

    let currentPlayer = 1;
    let player1Total = 0;
    let player2Total = 0;
    let isRolling = false;
    const winningScore = 20;

    // NEW: Arrays to store sushi collection for each player
    let player1SushiCollection = [];
    let player2SushiCollection = [];

    // Audio elements
    const bgMusic = document.getElementById('bgMusic');
    const diceSound = document.getElementById('diceSound');
    const winnerSound = document.getElementById('winnerSound');

    // Start background music immediately when page loads
    bgMusic.play().catch(e => {
        // If autoplay is blocked, play on first user interaction
        console.log('Autoplay blocked, will start on first interaction:', e);
        document.addEventListener('click', function startMusicOnClick() {
            bgMusic.play();
            document.removeEventListener('click', startMusicOnClick);
        }, { once: true });
    });

    // Start a new game
    function startGame() {
        
        hideAllScreens();
        document.getElementById('player1Screen').classList.add('active');
        currentPlayer = 1;
        player1Total = 0;
        player2Total = 0;
        isRolling = false;
        
        // Reset sushi collections
        player1SushiCollection = [];
        player2SushiCollection = [];
        
        updateScores();
        
        // Enable Player 1 buttons
        document.getElementById('roll1').disabled = false;
        document.getElementById('pass1').disabled = false;
    }

    // Hide all game screens
    function hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }

    // Handle dice rolling
    function rollDice(player) {
        if (isRolling || player !== currentPlayer) return;
        
        isRolling = true;
        const diceElement = document.getElementById(`dice${player}`);
        const rollButton = document.getElementById(`roll${player}`);
        const passButton = document.getElementById(`pass${player}`);
        
        rollButton.disabled = true;
        passButton.disabled = true;
        diceElement.classList.add('rolling');

        // Play dice sound
        diceSound.currentTime = 0;
        diceSound.play().catch(e => console.log('Audio play failed:', e));

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
                
                // Store the rolled sushi in the player's collection
                if (currentPlayer === 1) {
                    player1SushiCollection.push(finalRoll);
                } else {
                    player2SushiCollection.push(finalRoll);
                }
                
                console.log(`Player ${currentPlayer} rolled: ${finalRoll}`);
                console.log(`Player 1 collection:`, player1SushiCollection);
                console.log(`Player 2 collection:`, player2SushiCollection);
                
                if (finalRoll === 1) {
                    // Rolled a 1 - lose all points and pass to next player
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
                    // Add points to score
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

    // Pass turn to other player
    function passTurn(player) {
        if (player !== currentPlayer) return;
        
        switchPlayer();
    }

    // Switch to the other player's turn
    function switchPlayer() {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        
        hideAllScreens();
        document.getElementById(`player${currentPlayer}Screen`).classList.add('active');
        
        const rollButton = document.getElementById(`roll${currentPlayer}`);
        const passButton = document.getElementById(`pass${currentPlayer}`);
        rollButton.disabled = false;
        passButton.disabled = false;
    }

    // Update all score displays
    function updateScores() {
        document.getElementById('player1ScoreDisplay').textContent = player1Total;
        document.getElementById('player2ScoreDisplay1').textContent = player2Total;
        document.getElementById('player1ScoreDisplay2').textContent = player1Total;
        document.getElementById('player2ScoreDisplay').textContent = player2Total;
    }

    // Check if someone won
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

    // NEW: Display sushi collection on winner screen
    function displaySushiCollection(player) {
        const collectionDiv = document.getElementById(`player${player}SushiCollection`);
        collectionDiv.innerHTML = ''; // Clear previous content
        
        const sushiArray = player === 1 ? player1SushiCollection : player2SushiCollection;
        
        console.log(`Displaying collection for Player ${player}:`, sushiArray);
        
        // Create and add each sushi image
        sushiArray.forEach((sushiNum, index) => {
            const sushiImg = document.createElement('img');
            sushiImg.src = `images/${sushiNum}.png`;
            sushiImg.alt = `Sushi ${sushiNum}`;
            sushiImg.className = 'sushi-item';
            
            // Add slight delay for staggered animation effect
            setTimeout(() => {
                collectionDiv.appendChild(sushiImg);
            }, index * 50);
        });
    }

    // Show winner screen
    function showWinner(player) {
        hideAllScreens();
        document.getElementById(`winner${player}Screen`).classList.add('active');
        
        // Display the winner's sushi collection
        displaySushiCollection(player);
        
        // Play winner sound
        winnerSound.currentTime = 0;
        winnerSound.play().catch(e => console.log('Audio play failed:', e));
    }

    // Restart the game
    function restartGame() {
        // Restart background music from the beginning
        bgMusic.currentTime = 0;
        bgMusic.play().catch(e => console.log('Music play failed:', e));
        
        hideAllScreens();
        document.getElementById('startScreen').classList.add('active');
        player1Total = 0;
        player2Total = 0;
        currentPlayer = 1;
        isRolling = false;
        
        // Reset sushi collections
        player1SushiCollection = [];
        player2SushiCollection = [];
        
        updateScores();
    }

    // Show no sushi popup
    function showNoSushiPopup() {
        const popup = document.getElementById('noSushiPopup');
        popup.classList.add('active');
        setTimeout(() => {
            popup.classList.remove('active');
        }, 2000);
    }

    // Show how to play instructions
    function showHowToPlay() {
        document.getElementById('howToPlayPopup').classList.add('active');
    }

    // Close how to play popup
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

})();