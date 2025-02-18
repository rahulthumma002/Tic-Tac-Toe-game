const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Winning combinations
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

// Handle cell click
function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.classList.add("taken");

    checkWinner();
}

// Check winner or draw
function checkWinner() {
    let roundWon = false;

    for (let condition of winConditions) {
        let [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} wins! 🎉`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.innerText = "It's a Tie! 🤝";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s turn`;
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.innerText = "Player X's turn";
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("taken");
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);
