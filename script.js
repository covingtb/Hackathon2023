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

// Get the necessary elements from the DOM
const playerDice = document.getElementById('player-dice');
const botDice = document.getElementById('bot-dice');
const rollPlayerButton = document.getElementById('roll-player-button');
const rollBotButton = document.getElementById('roll-bot-button');

// Function to generate a random number between 1 and 6
function getRandomNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

// Function to roll the player dice and update the score
function rollPlayerDice() {
  // Generate a random number between 1 and 6
  const randomNumber = getRandomNumber();

  // Update the player dice image source
  playerDice.src = `dice${randomNumber}.png`;

  // Update the player score
  playerScore += randomNumber;
  document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;

  checkWinner();
}

// Function to roll the bot dice and update the score
function rollBotDice() {
  // Generate a random number between 1 and 6
  const randomNumber = getRandomNumber();

  // Update the bot dice image source
  botDice.src = `dice${randomNumber}.png`;

  // Update the bot score
  botScore += randomNumber;
  document.getElementById('bot-score').textContent = `Bot Score: ${botScore}`;

  checkWinner();
}

// Function to check the winner and handle game over condition
function checkWinner() {
  if (playerScore >= 20 || botScore >= 20) {
    let winner;
    if (playerScore > botScore) {
      winner = 'Player';
    } else if (botScore > playerScore) {
      winner = 'Bot';
    } else {
      winner = 'It\'s a tie';
    }
    alert(`Game over! ${winner} wins!`);
    resetScores();
  }
}

// Function to reset scores and dice images
function resetScores() {
  playerScore = 0;
  botScore = 0;
  document.getElementById('player-score').textContent = 'Player Score: 0';
  document.getElementById('bot-score').textContent = 'Bot Score: 0';
  playerDice.src = 'dice-empty.png';
  botDice.src = 'dice-empty.png';
}

// Add click event listeners to the buttons
rollPlayerButton.addEventListener('click', rollPlayerDice);
rollBotButton.addEventListener('click', rollBotDice);


