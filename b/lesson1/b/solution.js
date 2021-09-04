const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const params = data
    .toString()
    .trim()
    .split(' ')
    .map(Number);

  main(params);
  process.exit(0);
});

const calcPathLength = (n, i, j) => {
  const pathRight = j - i - 1;
  const pathLeft = n - j + i - 1;

  return Math.min(pathLeft, pathRight);
};

const main = params => {
  const [n, i, j] = params;

  const pathLength = calcPathLength(n, Math.min(i, j), Math.max(i, j));

  console.log(pathLength);
};
