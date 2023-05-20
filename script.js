const diceImages = [
  "Dice1.png",
  "Dice2.png",
  "Dice3.png",
  "Dice4.png",
  "Dice5.png",
  "Dice6.png"
];

let playerScore = 0;
let botScore = 0;
let playerWins = 0;
let botWins = 0;

let botRollTimer = null;
// Flag to track whether the bot is rolling
let isBotRolling = false;

const jsConfetti = new JSConfetti();

function rollDice(player) {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const diceImage = diceImages[diceValue - 1];

  if (player === 'player') {
    playerScore += diceValue;
    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
    document.getElementById('player-dice').src = diceImage;
  } else if (player === 'bot') {
    botScore += diceValue;
    document.getElementById('bot-score').textContent = `Bot Score: ${botScore}`;
    document.getElementById('bot-dice').src = diceImage;
  }

  if (!isBotRolling) {
    isBotRolling = true;
    rollPlayerButton.disabled = true;

    clearTimeout(botRollTimer); // Clear any existing bot roll timer
    botRollTimer = setTimeout(() => {
      rollDice('bot');
      isBotRolling = false;
      rollPlayerButton.disabled = false;
      checkWinner(); // Move the checkWinner() call here
    }, 1000); // Set bot roll delay to .5 seconds (500 milliseconds)
  } else {
    checkWinner(); // Call checkWinner() for the player's roll as well
  }
}

function checkWinner() {
  if (playerScore >= 20 || botScore >= 20) {
    let winner;
    if (playerScore > botScore) {
      winner = 'Player';
      playerWins++;
      document.getElementById('player-wins').textContent = `Player Wins: ${playerWins}`;
      showConfetti(); // Call showConfetti() when the player wins
    } else if (botScore > playerScore) {
      winner = 'Bot';
      botWins++;
      document.getElementById('bot-wins').textContent = `Bot Wins: ${botWins}`;
    } else {
      winner = 'It\'s a tie';
    }
    alert(`Game over! ${winner} wins!`);
    resetScores();
  }
}

function resetScores() {
  playerScore = 0;
  botScore = 0;
  document.getElementById('player-score').textContent = 'Player Score: 0';
  document.getElementById('bot-score').textContent = 'Bot Score: 0';
  document.getElementById('player-dice').src = 'dice-empty.png';
  document.getElementById('bot-dice').src = 'dice-empty.png';
}

function showConfetti() {
  jsConfetti.addConfetti();
}

// Get the necessary elements from the DOM
const rollPlayerButton = document.getElementById('roll-player-button');
const rollBotButton = document.getElementById('roll-bot-button');

// Add a click event listener to the "Roll Player Dice" button
rollPlayerButton.addEventListener('click', () => {
  if (!isBotRolling) {
    rollDice('player');
  }
});

