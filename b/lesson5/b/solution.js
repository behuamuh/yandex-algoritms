const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
let nums;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  if (!nums) {
    nums = [0].concat(strToArray(param));
  }

  main();
  process.exit(0);
});

const printResult = () => {
  const sums = [0];
  const mins = [0];
  let max = -Infinity;
  for (let i = 1; i < nums.length; i++) {
    sums[i] = sums[i - 1] + nums[i];
    mins[i] = Math.min(mins[i - 1], sums[i]);

    if (sums[i] - mins[i - 1] > max) max = sums[i] - mins[i - 1];
  }

  console.log(max);
};

const main = () => {
  printResult();
};
