const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = null;
    }
  }

  const getBoard = () => board;

  return { getBoard };
})();

const Player = (name, symbol) => {
  return { name, symbol };
};

const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

const GameController = (function () {
  let currentPlayer = player1;

  const switchTurn = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const makeMove = (row, col) => {
    if (GameBoard.getBoard()[row][col] === null) {
      GameBoard.getBoard()[row][col] = currentPlayer.symbol;
      switchTurn();
    } else {
      console.log('Spot already taken!');
    }
  };

  return { switchTurn, getCurrentPlayer, makeMove };
})();

console.log(GameController.getCurrentPlayer());
