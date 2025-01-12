const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const gameModeSelect = document.getElementById('game-mode');
const scoreXDisplay = document.getElementById('score-x');
const scoreODisplay = document.getElementById('score-o');
const scoreDrawDisplay = document.getElementById('score-draw');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameMode = 'pvp'; // Default mode is Player vs Player
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

gameModeSelect.addEventListener('change', (event) => {
    gameMode = event.target.value;
    resetGame();
});

function handleClick(event) {
    const index = event.target.dataset.index;
    if (gameState[index] === '' && currentPlayer === 'X') {
        makeMove(index, 'X');
        if (gameMode === 'ai' && !checkWin() && !isDraw()) {
            makeAIMove();
        }
    } else if (gameMode === 'pvp' && gameState[index] === '' && currentPlayer === 'O') {
        makeMove(index, 'O');
    }
}

function makeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
    if (checkWin()) {
        updateScore(player);
        setTimeout(() => alert(`${player} wins!`), 10);
        resetGame();
    } else if (isDraw()) {
        updateScore('draw');
        setTimeout(() => alert('It\'s a draw!'), 10);
        resetGame();
    } else {
        currentPlayer = player === 'X' ? 'O' : 'X';
    }
}

function makeAIMove() {
    let availableCells = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex, 'O');
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => gameState[index] === currentPlayer);
    });
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function updateScore(player) {
    if (player === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
    } else if (player === 'O') {
        scoreO++;
        scoreODisplay.textContent = scoreO;
    } else if (player === 'draw') {
        scoreDraw++;
        scoreDrawDisplay.textContent = scoreDraw;
    }
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', resetGame);
