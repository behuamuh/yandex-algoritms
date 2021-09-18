const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const param = data.toString().trim();

  main(param);
  process.exit(0);
});

const printResult = arr => {
  const map = {};

  arr.forEach(n => {
    const result = map[n] ? 'YES' : 'NO';
    map[n] = true;
    
    console.log(result);
  });
};

const main = param => {
  const arr = strToArray(param);

  printResult(arr);
};
