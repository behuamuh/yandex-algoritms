const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let x1, y1, x2, y2, x3, y3, r;

rl.on('line', function (data) {
  const param = data
    .toString()
    .trim();

  if (typeof x1 === 'undefined') {
    [x1, y1, x2, y2] = strToArray(param);
    return;
  }

  [x3, y3, r] = strToArray(param);

  main();
  process.exit(0);
});

const getPointsCount = x => {
  const tmp = r ** 2 - (x - x3) ** 2;

  if (tmp < 0) return 0;

  const sqrt = Math.sqrt(tmp);
  const yMin = Math.max(Math.ceil(y3 - sqrt), y1);
  const yMax = Math.min(Math.floor(y3 + sqrt), y2);

  if (yMin > yMax) return 0;

  return yMax - yMin + 1;
};

const checkAllPoints = () => {
  let result = 0;

  for (let x = x1; x <= x2; x++) {
    result += getPointsCount(x);
  }

  return result;
};

const main = () => {
  const result = checkAllPoints();

  console.log(result);
};
