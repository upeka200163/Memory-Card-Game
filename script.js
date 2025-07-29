const emojis = [
  '🍕', '🍕',
  '🍔', '🍔',
  '🍎', '🍎',
  '🍩', '🍩',
  '🍉', '🍉',
  '🍇', '🍇',
  '🍓', '🍓',
  '🍒', '🍒',
  '🍍', '🍍',
  '🥝', '🥝',
  '🍪', '🍪',
  '🧁', '🧁'
];

const shuffled = emojis.sort(() => 0.5 - Math.random());
const board = document.getElementById('memory-board');
const winScreen = document.getElementById('win-screen');
const timerDisplay = document.getElementById('timer');

let flipped = [];
let matched = 0;
let timeLeft = 600; // 10 minutes (600 seconds)
let timerInterval = null;

// Create Cards
shuffled.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-face card-front">${symbol}</div>
    <div class="card-face card-back">?</div>
  `;
  card.dataset.symbol = symbol;
  card.addEventListener('click', handleFlip);
  board.appendChild(card);
});

// Start the Timer
function startTimer() {
  timerInterval = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endGame(false); // Time's up
    }

    timeLeft--;
  }, 1000);
}

startTimer();

// Handle Card Flipping
function handleFlip(e) {
  const card = e.currentTarget;
  if (card.classList.contains('flipped') || flipped.length === 2) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    const [first, second] = flipped;

    if (first.dataset.symbol === second.dataset.symbol) {
      matched++;
      flipped = [];

      if (matched === emojis.length / 2) {
        setTimeout(() => {
          endGame(true); // Win
        }, 600);
      }

    } else {
      setTimeout(() => {
        first.classList.remove('flipped');
        second.classList.remove('flipped');
        flipped = [];
      }, 900);
    }
  }
}

// Game End Function
function endGame(won) {
  clearInterval(timerInterval);
  const message = document.createElement('p');
  message.style.marginTop = '20px';
  message.style.fontSize = '18px';

  if (won) {
    message.textContent = '🎉 Congratulations! You matched all the cards!';
  } else {
    message.textContent = '⏳ Time\'s up! Try again.';
  }

  document.querySelector('.win-content').appendChild(message);
  winScreen.classList.add('active');
}