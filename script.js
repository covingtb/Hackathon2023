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

function displayBotSpeech() {
  const botSpeechBubble = document.getElementById('bot-speech-container');
  botSpeechBubble.textContent = "Hi! Roll dice the dice to get a score. I will roll my dice after you. Whoever gets to 20 faster, or gets more points, wins!";
  botSpeechBubble.style.display = "block";
}

function displayBotPlayAgain() {
  const botSpeechBubble = document.getElementById('bot-speech-container');
  botSpeechBubble.textContent = "Roll the dice and lets play again!";
  botSpeechBubble.style.display = "block";
}
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
  }

  // Hide bot speech bubble after player rolls dice
  const botSpeechBubble = document.getElementById('bot-speech-container');
  botSpeechBubble.style.display = "none";
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
      winner = 'Everyone';
    }
    alert(`Game over! ${winner} wins!`);
    showConfetti();
    setTimeout(resetScores, 3000); // Delay in milliseconds (3 seconds in this example)
    displayBotPlayAgain()
  }
}

function resetScores() {
  playerScore = 0;
  botScore = 0;
  document.getElementById('player-score').textContent = 'Player Score: 0';
  document.getElementById('bot-score').textContent = 'Bot Score: 0';
  document.getElementById('player-dice').src = 'dice-empty.png';
  document.getElementById('bot-dice').src = 'dice-empty.png';
  removeConfetti();
}

function showConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  const confettiCount = 100; // Number of confetti pieces to generate

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 3}s`; // Randomize the delay for a staggered effect
    confettiContainer.appendChild(confetti);
  }
}

function removeConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  while (confettiContainer.firstChild) {
    confettiContainer.removeChild(confettiContainer.firstChild);
  }
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

// Display bot speech bubble when the page loads
window.addEventListener('load', () => {
  displayBotSpeech();
});
