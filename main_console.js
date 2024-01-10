// Player Objects
const player1 = { name: "Player 1", marker: "X", turn: true };
const player2 = { name: "Player 2", marker: "O", turn: false };

// Gameboard Object
const Gameboard = function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const status = document.getElementById("status");

  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }
  function updateBoard(index, marker) {
    if (board[index] === "") {
      board[index] = marker;
      return true;
    } else {
      console.log("Invalid move. Cell already taken.");
      return false;
    }
  }

  function checkForWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
        const winner = board[a];
        status.textContent = `Player ${winner} wins!`;

        return true;
      }
    }
    return false;
  }
  function checkForTie() {
    if (!board.includes("")) {
      if (!checkForWin()) {
        status.textContent = "It's a tie!";
        return true;
      }
    }
    return false;
  }

  function playerTurn() {
    const gameboardColumn = document.querySelectorAll(".gameboard-column");
    gameboardColumn.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        if (player1.turn && board[e.target.id] === "") {
          updateBoard(e.target.id, player1.marker);
          cell.textContent = player1.marker; // Update cell content
          player1.turn = false;
          player2.turn = true;
        } else if (player2.turn && board[e.target.id] === "") {
          updateBoard(e.target.id, player2.marker);
          cell.textContent = player2.marker; // Update cell content
          player2.turn = false;
          player1.turn = true;
        }
        if (checkForWin()) {
          return;
        } else {
          if (checkForTie()) {
            return;
          }
        }
      });
    });
  }

  return { playerTurn, resetBoard, status };
};

//User clicks start game button and it loads the page and starts
const startButton = document.getElementById("start-game-btn");

const statusWrapper = document.getElementById("status-wrapper");

startButton.addEventListener("click", () => {
  //remove startgame button
  const gameboardTable = document.getElementById("gameboard-table");
  const restartButton = document.getElementById("restart-btn");
  startButton.style.display = "none";
  gameboardTable.style.display = "block";
  restartButton.style.display = "block";

  const gameboard = new Gameboard();
  gameboard.playerTurn(); // Call this to start listening for player turns

  //PopUp of winner, remove everything else
  //if winner or tie

  //Restart button, if it's clicked, clear the board
  restartButton.addEventListener("click", () => {
    gameboard.resetBoard();

    const cells = document.querySelectorAll(".gameboard-column");
    cells.forEach((cells) => {
      cells.textContent = "";
    });
    gameboard.status.textContent = "";
  });
});
