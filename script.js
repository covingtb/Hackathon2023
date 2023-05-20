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
let isFirstRound = true;
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

  checkWinner();

  if (player === 'player') {
    isBotRolling = true;
    rollPlayerButton.disabled = true;

    clearTimeout(botRollTimer);
    botRollTimer = setTimeout(() => {
      rollDice('bot');
      isBotRolling = false;
      rollPlayerButton.disabled = false;
    }, 2000);

    if (!isFirstRound) {
      document.getElementById('first-player-msg').textContent = 'Bot goes first!';
    }
  }
  isFirstRound = false;
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

const rollPlayerButton = document.getElementById('roll-player-button');

rollPlayerButton.addEventListener('click', () => {
  if (!isBotRolling) {
    rollDice('player');
  }
});
