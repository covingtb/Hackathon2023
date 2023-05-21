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
let isBotRolling = false;

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

    clearTimeout(botRollTimer);
    botRollTimer = setTimeout(() => {
      rollDice('bot');
      isBotRolling = false;
      rollPlayerButton.disabled = false;
      checkWinner();
    }, 1000);
  } else {
    checkWinner();
  }
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

    const dialog = document.getElementById('winner-dialog');
    const dialogText = dialog.querySelector('.dialog-text');
    dialogText.textContent = `Game over! ${winner} wins!`;

    dialog.showModal();
    showConfetti();
    setTimeout(() => {
      dialog.close();
      resetScores();
    }, 5000);
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
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 3}s`;
    confettiContainer.appendChild(confetti);
  }
}

function removeConfetti() {
  const confettiContainer = document.getElementById('confetti-container');
  while (confettiContainer.firstChild) {
    confettiContainer.removeChild(confettiContainer.firstChild)
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

// Add a click event listener to the "Close" button in the winner dialog
const dialogCloseButton = document.getElementById('dialog-close-button');
dialogCloseButton.addEventListener('click', () => {
  const dialog = document.getElementById('winner-dialog');
  dialog.close();
  resetScores();
});
