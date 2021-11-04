const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let a;
const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, m] = strToArray(param);
    return;
  }

  if (!a) {
    a = strToArray(param).reduce((acc, item) => {
      acc[item] = acc[item] || 0;
      acc[item]++;
      return acc;
    }, {});

    let sum = 0;

    for (const key in a) {
      sum += a[key];
      a[key] = sum;
    }

    a[-1] = 0;
    a[1e9 + 1] = sum;

    return;
  }

  params.push(param);

  if (params.length >= m) {
    main();
    process.exit(0);
  }
});

const lSearch = (num, arr) => {
  let l = 0;
  let r = arr.length - 1;
  let m;

  while (l < r) {
    m = Math.floor((l + r) / 2);

    if (arr[m] > num) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return l;
};

const rSearch = (num, arr) => {
  let l = 0;
  let r = arr.length - 1;
  let m;

  while (l < r) {
    m = Math.floor((l + r) / 2) + 1;

    if (arr[m] < num) {
      l = m;
    } else {
      r = m - 1;
    }
  }

  return l;
};

const checkResult = () => {
  const keys = Object.keys(a).map(Number).sort((a, b) => a - b);
  
  const result = params.map(param => {
    const [l, r] = strToArray(param);
    const min = keys[rSearch(l, keys)];
    const max = keys[lSearch(r, keys) - 1];
    return a[max] - a[min];
  });

  console.log(result.join(' '));
};

const main = () => {
  checkResult();
};
