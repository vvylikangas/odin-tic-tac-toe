// gameboard IIFE
const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = null;
      }
    }
  };

  const getBoard = () => board;

  return { getBoard, resetBoard };
})();

// player factory
const Player = (name, symbol) => {
  return { name, symbol };
};

// create players
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

// game controller IIFE
const GameController = (function () {
  let currentPlayer = player1;
  let gameOver = false;
  const resetBtn = document.getElementById('reset');
  const resultEl = document.getElementById('result');

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWin = (symbol) => {
    // check rows
    for (let row = 0; row < 3; row++) {
      if (
        GameBoard.getBoard()[row][0] === symbol &&
        GameBoard.getBoard()[row][1] === symbol &&
        GameBoard.getBoard()[row][2] === symbol
      ) {
        return true;
      }
      // more advanced method:
      // if (GameBoard.getBoard()[row].every((cell) => cell === symbol)) {
      //   return true;
      // }
    }

    // check columns
    for (let col = 0; col < 3; col++) {
      if (
        GameBoard.getBoard()[0][col] === symbol &&
        GameBoard.getBoard()[1][col] === symbol &&
        GameBoard.getBoard()[2][col] === symbol
      ) {
        return true;
      }
      // more advanced method:
      // if (GameBoard.getBoard().every((row) => row[col] === symbol)) {
      //   return true;
      // }
    }

    // check diagonals
    if (
      GameBoard.getBoard()[0][0] === symbol &&
      GameBoard.getBoard()[1][1] === symbol &&
      GameBoard.getBoard()[2][2] === symbol
    ) {
      return true;
    }

    if (
      GameBoard.getBoard()[0][2] === symbol &&
      GameBoard.getBoard()[1][1] === symbol &&
      GameBoard.getBoard()[2][0] === symbol
    ) {
      return true;
    }
    return false; // No winner yet
  };

  // check if all cells are filled
  const checkTie = () => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (GameBoard.getBoard()[row][col] === null) {
          return false;
        }
      }
    }
    return true;

    // more advanced way:
    // return GameBoard.getBoard()
    //   .flat()
    //   .every((cell) => cell !== null);
  };

  const makeMove = (row, col) => {
    if (gameOver) return;
    resultEl.innerText = '';
    if (GameBoard.getBoard()[row][col] === null) {
      GameBoard.getBoard()[row][col] = currentPlayer.symbol;

      // check win or tie
      if (checkWin(currentPlayer.symbol)) {
        resultEl.innerText = `${currentPlayer.name} wins!`;
        gameOver = true;
        return;
      }
      if (checkTie()) {
        resultEl.innerText = "It's a tie!";
        gameOver = true;
        return;
      }
      switchTurn();
    } else {
      resultEl.innerText = 'Spot already taken!';
    }
  };

  resetBtn.addEventListener('click', () => {
    currentPlayer = player1;
    gameOver = false;
    GameBoard.resetBoard();
    resultEl.innerText = '';
    DisplayController.renderBoard();
  });

  return { switchTurn, getCurrentPlayer, makeMove };
})();

const DisplayController = (function () {
  const gameContainer = document.getElementById('game-container');

  const renderBoard = () => {
    const board = GameBoard.getBoard();
    gameContainer.innerHTML = '';

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const cell = document.createElement('button');
        cell.classList.add('cell');
        cell.textContent = board[row][col];

        cell.addEventListener('click', () => {
          GameController.makeMove(row, col);
          DisplayController.renderBoard();
        });

        gameContainer.appendChild(cell);
      }
    }
  };
  return { renderBoard };
})();

GameBoard.resetBoard();
DisplayController.renderBoard();
