const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const params = data
    .toString()
    .trim();

  main(params);
  process.exit(0);
});

const makePalindrom = str => {
  let result = 0;
  const arr = str.split('');

  for (let i = 0; i < arr.length / 2; i++) {
    if (arr[arr.length - 1 - i] !== arr[i]) {
      result++;
    }
  }

  return result;
};

const main = params => {
  const result = makePalindrom(params);
  console.log(result);
};
