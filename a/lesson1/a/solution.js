const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const params = [];

rl.on('line', function (data) {
  const param = Number(data.toString().trim());
  params.push(param);

  if (params.length >= 4) {
    main();
    process.exit(0);
  }
});

const getEquationSolve = (a, b, c, d) => {
  const x = - b / a;

  if (a === 0 && b === 0) return 'INF';
  if (c === 0 && d === 0) return 'NO';
  if (!Number.isInteger(x)) return 'NO';

  if ((a * x + b) / (c * x + d) === 0) return x;

  return 'NO';
};

const main = () => {
  const result = getEquationSolve(...params);

  console.log(result);
};
