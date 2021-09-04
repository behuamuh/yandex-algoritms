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

const checkData = (first, second) => {
  const isBroken = first < 13 && second < 13 && first !== second;

  return isBroken ? 0 : 1;
};

const main = params => {
  const result = checkData(...params);

  console.log(result);
};
