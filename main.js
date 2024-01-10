//Store the game board as an array inside of the Gameboard object
const Gameboard = function () {
  //intial gameboard
  const board = ["", "", "", "", "", "", "", "", ""];

  function getBoard() {
    return board;
  }

  //Updating the board
  function updateBoard(index, marker) {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      console.log("Invalid, choose another cell");
      return false;
    }
  }

  //function checks if player has won the game, returns boolean
  function checkForWin() {
    // Array of winning combinations (indexes of the board)
    const winCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    //iterate through each combination
    for (const combination of winCombinations) {
      const [a, b, c] = combination;

      //checking if any combination is a winning combination

      if (board[a] != "" && board[a] == board[b] && board[a] == board[c]) {
        return true;
      }
    }
    return false;
  }

  //function checks for tie, returns boolean
  function checkForTie() {
    //if theres no empty strings, and checkForWin is false -> means there is a tie
    //loop through the board and check for empty strings
    for (const marker of board) {
      //empty cell -> game continues
      if (marker === "") {
        return false;
      }
    }
    //check if checkForWin is false
    if (!this.checkForWin()) {
      return true;
    } else {
      return false;
    }
  }

  //if user clicks reset button, game resets to its initial state
  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }
  return {
    getBoard,
    updateBoard,
    checkForWin,
    checkForTie,
    resetBoard,
  };
};
//Store player in an object
function Player(name, marker) {
  return { name, marker };
}
const game = function () {
  //Create two players
  const player1 = new Player("player1", "X");
  const player2 = new Player("player2", "O");
  //To start, Player 1 is 'X' and Player 2 is 'O'
  //Start with player 1
  let currentPlayer = player1;

  function getCurrentPlayer() {
    return currentPlayer;
  }

  //play turn function
  function playTurn(index, marker) {
    // - Get the current player using getCurrentPlayer()
    const current = getCurrentPlayer();
    if (gameboard.updateBoard(index, marker)) {
      if (gameboard.checkForWin()) {
        const winnerName = current.name;
        console.log(`${winnerName}`);
        DOMDisplay.status.textContent = `${winnerName} has won the game!`;
        return;
      } else if (gameboard.checkForTie()) {
        DOMDisplay.status.textContent = "It's a tie!";
        return;
      }
      switchPlayer();
    } else {
      DOMDisplay.status.textContent = "Invalid move. Cell already taken.";
    }
  }

  //condition ? exprIfTrue : exprIfFalse
  function switchPlayer() {
    currentPlayer = currentPlayer == player1 ? player2 : player1;
  }

  return { getCurrentPlayer, switchPlayer, playTurn };
};

document.addEventListener("DOMContentLoaded", function () {
  const DOMDisplay = {
    //Getting the table cell elements
    cells: document.querySelectorAll(".gameboard-column"),
    status: document.getElementById("status"),

    //intializing the gameboard
    initializeGame(gameInstance) {
      this.cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
          this.handleMove(cell, index, gameInstance);
        });
      });
    },

    //updating the text content of the cell
    updateCell(cell, marker) {
      cell.textContent = marker;
    },
    handleMove(cell, index, gameboard) {
      const currentPlayer = gameboard.getCurrentPlayer();
      const marker = currentPlayer.marker;

      if (gameboard.updateBoard(index, marker)) {
        this.updateCell(cell, marker);
        gameboard.playTurn(index, marker);
      } else {
        // Handle the invalid move
        gameboard.playTurn(-1, marker);
      }
    },
  };
  const gameInstance = game();
  const gameBoard = new Gameboard();
  DOMDisplay.initializeGame(gameInstance);
});
