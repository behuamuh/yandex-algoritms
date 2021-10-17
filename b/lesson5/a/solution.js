const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inFile = path.join(__dirname, 'input.txt');
const outFile = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
  input: fs.createReadStream(inFile),
  output: fs.createWriteStream(outFile),
  terminal: false,
});

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

let n, q;
let nums;
let params = [];
let sums = [0];

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, q] = strToArray(param);
    return;
  }

  if (!nums) {
    nums = [0].concat(strToArray(param));
    return;
  }

  params.push(param);

  if (params.length >= q) {
    main();
    process.exit(0);
  }
});

const printResult = () => {
  params.forEach(param => {
    const [l, r] = strToArray(param);

    if (!sums[r]) {
      for (let i = sums.length; i <= r; i++) {
        sums[i] = sums[i - 1] + nums[i];
      }
    }

    console.log(sums[r] - sums[l - 1]);
  });
};

const main = () => {
  printResult();
};

// Решение на ноде не проходило не при чтении из файла, не из консоли
// Поэтому для этой задачи использовал пайтон
