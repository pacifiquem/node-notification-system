var board = document.getElementById("board");
var cells = board.getElementsByClassName("cell");
var currentPlayer = "X";

// Reset the game
function reset() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  currentPlayer = "X";
}

// Handle a click on a cell
function handleClick(event) {
  var cell = event.target;
  if (cell.textContent !== "") {
    return;
  }
  cell.textContent = currentPlayer;
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  checkWinner();
}

// Check for a winner
function checkWinner() {
  var winner = null;
  // Check for a row winner
  for (var i = 0; i < 3; i++) {
    if (cells[i * 3].textContent === cells[i * 3 + 1].textContent === cells[i * 3 + 2].textContent && cells[i * 3].textContent !== "") {
      winner = cells[i * 3].textContent;
    }
  }

  // Check for a column winner
  for (var i = 0; i < 3; i++) {
    if (cells[i].textContent === cells[i + 3].textContent === cells[i + 6].textContent && cells[i].textContent !== "") {
      winner = cells[i].textContent;
    }
  }

  // Check for a diagonal winner
  if (cells[0].textContent === cells[4].textContent === cells[8].textContent && cells[0].textContent !== "") {
    winner = cells[0].textContent;
  }

  if (cells[2].textContent === cells[4].textContent === cells[6].textContent && cells[2].textContent !== "") {
    winner = cells[2].textContent;
  }

  // If there is a winner, announce it
  if (winner !== null) {
    alert("The winner is " + winner);
    reset();
  }
}

// Initialize the game
for (var i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", handleClick);
}
