const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const param = data.toString().trim();

  main(param);
  process.exit(0);
});

const isTriangleExist = (a, b, c) => {
  return a + b > c &&
    a + c > b &&
    b + c > a;
};

const getABCMax = p => {
  const a = Math.floor(p / 3);
  const remainder = p % 3;
  let b;
  let c;

  if (remainder === 2) {
    b = c = a + 1;
  } else if (remainder === 1) {
    b = a + 1;
    c = a;
  } else {
    b = c = a;
  }
  
  if (isTriangleExist(a, b, c))

  return [a, b, c];
};

const getABCMin = p => {
  let a = p % 2 === 0 ? 2 : 1;
  let b;
  let c;

  b = c = (p - a) / 2;

  if (isTriangleExist(a, b, c))

  return [a, b, c];
};

const main = p => {
  const max = getABCMax(p);
  const min = getABCMin(p);

  if (!max || !min) {
    console.log(-1);
    return;
  }

  console.log(max.join(' '));
  console.log(min.join(' '));
};
