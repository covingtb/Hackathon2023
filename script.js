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
let rounds = 0;
let playerWins = 0;

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
  if (playerScore < 20 && botScore < 20) {
    // Generate a random number between 1 and 6
    const randomNumber = getRandomNumber();

    // Update the player dice image source
    playerDice.src = `dice${randomNumber}.png`;

    // Update the player score
    playerScore += randomNumber;
    document.getElementById('player-score').textContent = `Player Score: ${playerScore}`;

    // Call the AI bot's rollBotDice function
    rollBotDice();

    checkWinner();
  }
}

// Function to roll the bot dice and update the score
function rollBotDice() {
  if (playerScore < 20 && botScore < 20) {
    // Generate a random number between 1 and 6
    const randomNumber = getRandomNumber();

    // Update the bot dice image source
    botDice.src = `dice${randomNumber}.png`;

    // Update the bot score
    botScore += randomNumber;
    document.getElementById('bot-score').textContent = `Bot Score: ${botScore}`;

    checkWinner();
  }
}

// Function to check the winner and handle game over condition
function checkWinner() {
  if (playerScore >= 20 || botScore >= 20) {
    let winner;
    if (playerScore > botScore) {
      winner = 'Player';
      playerWins++;
    } else if (botScore > playerScore) {
      winner = 'Bot';
    } else {
      winner = 'It\'s a tie';
    }

    rounds++;

    // Calculate the percentage chance of the user winning
    const winPercentage = (playerWins / rounds) * 100;

    // Trigger confetti effect
    if (winner === 'Player') {
      triggerConfetti();
    }

    alert(`Game over! ${winner} wins!\nPlayer Wins: ${playerWins}\nRounds Played: ${rounds}\nWin Percentage: ${winPercentage.toFixed(2)}%`);
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

// Function to trigger confetti effect
function triggerConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  for (let i = 0; i < 20; i++)





