const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  params.push(param);

  if (params.length >= n) {
    main();
    process.exit(0);
  }
});

const printResult = () => {
  const map = params.reduce((acc, param) => {
    const [d, a] = strToArray(param);
    acc[d] = acc[d] || 0;
    acc[d] += Number(a) / 1000;
    return acc;
  }, {});

  Object.keys(map).sort((a, b) => Number(a) - Number(b))
    .forEach(d => {
      console.log(`${d} ${Math.floor(map[d] * 1000)}`);
    });
};

const main = () => {
  printResult();
};

// Так как размер чисел превышает Number.MAX_SAFE_INTEGER, то верное решение не проходит
// При попытке использовать Bigint - не проходит по времени
// Поэтому для этой задачи использовал пайтон
