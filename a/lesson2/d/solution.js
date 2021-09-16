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

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  main(param);
  process.exit(0);
});

const getAnswer = nums => {
  const max = Math.max(...nums);

  const sum = nums.reduce((s, n) => s + n);

  return (sum - max < max) ? max * 2 - sum : sum;
};

const main = param => {
  const nums = strToArray(param);
  const answer = getAnswer(nums);
  console.log(answer);
};
