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
let k;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, k] = strToArray(param);
    return;
  }

  main(param);
  process.exit(0);
});

// Ai - min, Aj - max
// Aj - Ai = n
// ACi = S - Ai
// ACj = S - Aj
// ACi - max, ACj - min
// ACi - ACj = S - Ai - (S - Aj) = Aj - Ai
// Таким образом разница между минимальным и максимальным элементами 
// при конфузах не меняется

const main = param => {
  let arr = strToArray(param);

  console.log(Math.max(...arr) - Math.min(...arr));
};
