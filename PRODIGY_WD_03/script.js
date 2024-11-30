const cells = document.querySelectorAll('.cell');
const gameMessage = document.getElementById('game-message');
const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(e) {
  const cell = e.target;
  const cellIndex = cell.getAttribute('data-index');

  if (gameState[cellIndex] || !gameActive) {
    return;
  }

  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;

  if (currentPlayer === 'X') {
    cell.classList.add('x-player');
  } else {
    cell.classList.add('o-player');
  }

  if (checkWinner()) {
    gameMessage.textContent = `Player ${currentPlayer} Wins!`;
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== null)) {
    gameMessage.textContent = 'Draw!';
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  gameMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  let won = false;
  winningConditions.some(condition => {
    const [a, b, c] = condition;
    if (gameState[a] === currentPlayer &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]) {
      won = true;
      // Ajouter la classe .winning-cell aux cases de la ligne gagnante
      cells[a].classList.add('winning-cell');
      cells[b].classList.add('winning-cell');
      cells[c].classList.add('winning-cell');
      return true;
    }
    return false;
  });
  return won;
}

function restartGame() {
  gameState.fill(null);
  currentPlayer = 'X';
  gameActive = true;
  gameMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x-player', 'o-player', 'winning-cell');  // Enlever toutes les classes ajoutées
  });
}

cells.forEach((cell, index) => {
  cell.setAttribute('data-index', index);
  cell.addEventListener('click', handleCellClick);
});
restartBtn.addEventListener('click', restartGame);
