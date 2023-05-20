const diceImages = [
  "dice1.png",
  "dice2.png",
  "dice3.png",
  "dice4.png",
  "dice5.png",
  "dice6.png"
];

let playerScore = 0;
let botScore = 0;
let playerWins = 0;
let botWins = 0;

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

  checkWinner();
}

function checkWinner() {
  if (playerScore >= 20 || botScore >= 20) {
    let winner;
    if (playerScore > botScore) {
      winner = 'Player';
      playerWins++;
      document.getElementById('player-wins').textContent = `Player Wins: ${playerWins}`;
    } else if (botScore > playerScore) {
      winner = 'Bot';
      botWins++;
      document.getElementById('bot-wins').textContent = `Bot Wins: ${botWins}`;
    } else {
      winner = 'It\'s a tie';
    }
    alert(`Game over! ${winner} wins!`);
    showConfetti();
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
  const confettiContainer = document.getElementById('confetti-container');
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.backgroundImage = `url(confetti.png)`;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 4}s`;
    confettiContainer.appendChild(confetti);
  }
}

// Get the necessary elements from the DOM
const rollPlayerButton = document.getElementById('roll-player-button');
const rollBotButton = document.getElementById('roll-bot-button');

// Add a click event listener to the "Roll Player Dice" button so it listens
rollPlayerButton.addEventListener('click', rollPlayerDice);
rollBotButton.addEventListener('click', rollBotDice);

// Add a click event listener to the "Roll Bot Dice" button
rollBotButton.addEventListener('click', rollBotDice);

// Function to roll the player dice and update the score
function rollPlayerDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const diceImage = diceImages[diceValue - 1];

  playerScore += diceValue;
  document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;
  document.getElementById('player-dice').src = diceImage;

  checkWinner();
}

// Function to roll the bot dice and update the score
function rollBotDice() {
  const diceValue = Math.floor(Math.random() * 6) + 1;
  const diceImage = diceImages[diceValue - 1];

  botScore += diceValue;
  document.getElementById('bot-score').textContent = `Bot Score: ${botScore}`;
  document.getElementById('bot-dice').src = diceImage;
    checkWinner();
}