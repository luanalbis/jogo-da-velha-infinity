let choiceToRemove;
let choicesInfinity;
let winnerPosition;
let isXTurn;
let gameMode = 'classic';
let winner;

const scores = { x: 0, o: 0, draw: 0 };
const board = document.querySelector('[board]');
const cells = document.querySelectorAll('[cell]');
const modalWinnner = document.querySelector('[modal-winner]');
const txtMsgWinner = document.querySelector('[txt-msg-winner]')
const txtStartingPlayer = document.querySelector('[txt-starting-player');

const winnerCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => selectCell(cell, index));
});

function startGame() {
    isXTurn = Math.round(Math.random()) === 0;
    choiceToRemove = undefined;
    choicesInfinity = [];
    winnerPosition = [];
    winner = undefined;
    cells.forEach(cell => cell.classList = 'cell');
    board.classList.remove('x', 'o');
    board.classList.add('board', getTurn());
    modalWinnner.classList.add('disabled');
    console.log(choiceToRemove);
    console.log(choicesInfinity);
}

function winCheck() {
    for (const combination of winnerCombinations) {
        if (combination.every(position => cells[position].classList.contains(getTurn()))) {
            winnerPosition = combination;
            winner = getTurn();
            return winner;
        }
    }

    if (Array.from(cells).every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
        winner = 'draw'
        return winner;
    }
}

function getTurn() {
    return isXTurn ? 'x' : 'o';
}

function updateBoardClass() {
    board.classList.remove('x', 'o');
    board.classList.add(getTurn());
}

function changeTurn() {
    isXTurn = !isXTurn;
}

function selectCell(cell, index) {
    if (winner) return;
    if (cell.classList.contains('x') || cell.classList.contains('o')) return;

    let turn = getTurn();
    cell.classList.add(turn);

    if (winCheck()) { endGame(); return; }
    if (gameMode === 'infinity') { updateInfinityCells(index) }

    changeTurn();
    updateBoardClass();
}

document.querySelector('[btn-play-again]').addEventListener('click', () => startGame());
document.querySelector('[btn-restart-game').addEventListener('click', () => startGame());
document.querySelector('[btn-change-mode').addEventListener('click', () => chameGameMode());



function chameGameMode() {
    gameMode = gameMode === 'classic' ? 'infinity' : 'classic';
    document.querySelector('[txt-game-mode').innerHTML = 'MODE: ' + gameMode.toUpperCase();
    startGame();
}

function disableCells() {
    cells.forEach((cell, index) => {
        cell.classList.remove('disabled');
        if (!winnerPosition.includes(index)) { cell.classList.add('disabled') }
    });
}

function endGame() {
    disableCells();
    updateScores();
    modalWinnner.classList.remove('disabled');
    if (winner !== 'draw') {
        txtMsgWinner.innerHTML = winner.toUpperCase() + ' - WIN'

    } else {
        txtMsgWinner.innerHTML = winner.toUpperCase();
    }
}

function updateScores() {
    scores[winner]++;
    document.querySelector(`[score-${winner}]`).innerHTML = scores[winner];
}

function updateInfinityCells(index) {
    choicesInfinity.push(index);

    if (choiceToRemove !== undefined) {
        cells[choiceToRemove].classList.remove('x', 'o', 'disabled');
        choiceToRemove = undefined;
    }

    if (choicesInfinity.length === 6) {
        choiceToRemove = choicesInfinity.shift();
        cells[choiceToRemove].classList.add('disabled');
    }
}

startGame();