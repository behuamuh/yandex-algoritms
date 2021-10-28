const readline = require('readline');
// A, K, B, M и X
const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let a, k, b, m, x;

rl.on('line', function (data) {
  const param = data.toString().trim();

  [a, k, b, m, x] = strToArray(param);

  main();
  process.exit(0);
});

const calc = days => {
  const awork = a * (days - Math.floor(days / k));
  const bwork = b * (days - Math.floor(days / m));

  return awork + bwork;
};

const getResult = () => {
  let l = 0;
  let r = 2 * Math.ceil(x / (a + b));
  let m;

  while (l < r) {
    m = Math.floor((r - l) / 2) + l;

    if (calc(m) >= x) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  
  return l;
};

const main = () => {
  const result = getResult();
  console.log(result);
};

// Алгоритм верный, но на ноде решение не проходит, сдал на пайтоне
