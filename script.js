const board = document.getElementById("board");
const result = document.getElementById("result");
const bingoLetters = document.querySelectorAll("#bingo span");

let marked = Array(25).fill(false);
let completedLines = new Set();

const patterns = [
    [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],
    [15,16,17,18,19],[20,21,22,23,24],
    [0,5,10,15,20],[1,6,11,16,21],
    [2,7,12,17,22],[3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],[4,8,12,16,20]
];

// Shuffle helper function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startGame() {
    board.innerHTML = "";
    result.innerText = "";
    marked.fill(false);
    completedLines.clear();

    bingoLetters.forEach(letter => letter.classList.remove("active"));

    let numbers = [...Array(25).keys()].map(i => i + 1);
    numbers = shuffleArray(numbers); // Shuffle numbers for new game

    numbers.forEach((num, i) => {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.innerText = num;
        cell.onclick = () => handleClick(cell, i);
        board.appendChild(cell);
    });
}

function handleClick(cell, index) {
    if (marked[index] || result.innerText !== "") return;

    marked[index] = true;
    cell.classList.add("player1");

    checkLines();
}

function checkLines() {
    patterns.forEach((pattern, pIndex) => {
        if (!completedLines.has(pIndex) &&
            pattern.every(i => marked[i])) {

            completedLines.add(pIndex);
            pattern.forEach(i => board.children[i].classList.add("win"));
        }
    });

    // Activate B I N G O letters
    bingoLetters.forEach((letter, i) => {
        if (i < completedLines.size) {
            letter.classList.add("active");
        }
    });

    if (completedLines.size >= 5) {
        result.innerText = "🎉 B I N G O — YOU WIN!!! 🎉";
    }
}

startGame();
