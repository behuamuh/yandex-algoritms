const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const X = '1';
const O = '2';
const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  params.push(param);

  if (params.length >= 3) {
    main();
    process.exit(0);
  }
});

const calcCount = (board, symbol) => {
  return board.reduce((acc, line) => {
    line.forEach(s => {
      if (s === symbol) acc++;
    });

    return acc;
  }, 0);
};

const checkWin = (board, symbol) => {
  let horizontalMatch = false;
  let verticalMatch = false;
  let firstDiagonalMatch = true;
  let secondDiagonalMatch = true;

  for (let i = 0; i < 3; i++) {
    if (board[i].every(s => s === symbol)) {
      horizontalMatch = true;
    }

    if (board[0][i] === symbol &&
      board[1][i] === symbol &&
      board[2][i] === symbol) {
      verticalMatch = true;
    }

    if (board[i][i] !== symbol) {
      firstDiagonalMatch = false;
    }

    if (board[i][2 - i] !== symbol) {
      secondDiagonalMatch = false;
    }
  }

  const result = horizontalMatch ||
    verticalMatch ||
    firstDiagonalMatch ||
    secondDiagonalMatch;

  return result;
};

const checkBoard = board => {
  const countX = calcCount(board, X);
  const countO = calcCount(board, O);
  const winX = checkWin(board, X);
  const winO = checkWin(board, O);

  if (winX && winO) return false;
  if (countX - countO > 1 || countX < countO) return false;
  if (winX && (countX === countO)) return false;
  if (winO && (countX - countO === 1)) return false;

  return true;
};

const main = () => {
  const board = params.map(p => p.split(' ').filter(Boolean));

  const result = checkBoard(board) ? 'YES' : 'NO';
  console.log(result);
};
