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
let m;
let x;
let y;

const comparator = (a, b) => a.n - b.n;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, m] = strToArray(param).sort(comparator);
    return;
  }

  if (!x) {
    x = strToArray(param).map((n, i) => ({ n, i: i + 1 })).sort(comparator);
    return;
  }

  y = strToArray(param).map((n, i) => ({ n, i: i + 1 })).sort(comparator);

  main();
  process.exit(0);
});

const checkResult = () => {
  const result = [];
  let count = 0;

  let k = 0;
  let j = 0;

  while (k < n && j < m) {
    if (x[k].n < y[j].n) {
      result[x[k].i] = y[j].i;
      count++;
      k++;
      j++;
    } else {
      j++;
    }
  }

  while (k < n) {
    result[x[k].i] = 0;
    k++;
  }

  console.log(count);
  console.log(result.slice(1).join(' '));
};

const main = () => {
  // console.log(result);
  checkResult();
};
