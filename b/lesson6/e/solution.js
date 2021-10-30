const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, k, points;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, k] = strToArray(param);
    return;
  }

  points = strToArray(param).sort((a, b) => a - b);
  main();
  process.exit(0);
});

const search = p => {
  let l = 0;
  let r = n - 1;
  let m;

  while (l < r) {
    m = Math.floor((r + l) / 2);
    
    if (points[m] > p ) {
      r = m;
    } else {
      l = m + 1; 
    }
  }

  return l;
};

const check = step => {
  let count = 1;
  let p = points[0] + step;

  while (p < points[n - 1]) {
    count++;
    p = points[search(p)] + step;
  }

  return count;
};

const getResult = () => {
  const len = points[n - 1] - points[0];
  let r = Math.ceil(len / k);
  let l = 0;
  let m;

  while (l < r) {
    m = Math.floor((l + r) / 2);
    const step = check(m);

    if (step <= k) {
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
