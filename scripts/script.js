// Select all the cells
const cells = document.querySelectorAll('td');

// Initialize the current player and the game state
let currentPlayer = 'X';
let gameActive = true;

// Function to handle a player's move
function handleMove(cell, index) {
  // Set the cell's text to the current player
  cell.textContent = currentPlayer;
  // Add the current player's class to the cell
  cell.classList.add(currentPlayer);
  // Check for a winner or a tie
  checkGameState();
  // Switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check for a winner or a tie
function checkGameState() {
  // Get all the cells with the current player's class
  const playerCells = document.querySelectorAll('.' + currentPlayer);
  // Check for a winning combination
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
  for (let combination of winningCombinations) {
    if (combination.every(index => playerCells[index])) {
      // The current player has won
      endGame(false, currentPlayer + ' wins!');
      return;
    }
  }
  // Check for a tie
  if (document.querySelectorAll('.X, .O').length === cells.length) {
    // The game is a tie
    endGame(true, 'Tie game!');
    return;
  }
}

// Function to end the game
function endGame(isTie, message) {
  gameActive = false;
  // Display the winner or tie message
  const messageElement = document.querySelector('#message');
  messageElement.textContent = message;
  // Set the class on the message element to show the message
  messageElement.classList.add('show');
  // Disable all the cells
  for (let cell of cells) {
    cell.classList.add('clicked');
  }
  // Show the reset button
  const resetButton = document.querySelector('#reset');
  resetButton.classList.add('show');
  // Change the reset button text if it's a tie game
  if (isTie) {
    resetButton.textContent = 'Play again';
  }
}

// Loop through all the cells and add a click event listener
for (let i = 0; i < cells.length; i++) {
  const cell = cells[i];
  cell.addEventListener('click', function() {
    // Check if the game is active and the cell hasn't been clicked
    if (gameActive && !cell.classList.contains('clicked')) {
      handleMove(cell, i);
    }
  });
}

// Add a click event listener to the reset button
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function() {
  // Reset the game
  for (let cell of cells) {
    cell.textContent = '';
    cell.classList.remove('X', 'O', 'clicked');
  }
  currentPlayer = 'X';
  gameActive = true;
  // Hide the message and reset button
  const messageElement = document.querySelector('#message');
  messageElement.classList.remove('show');
  resetButton.classList.remove('show');
  // Reset the reset button text
  resetButton.textContent = 'Reset';
});
