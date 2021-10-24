const readline = require('readline');

const compare = (a, b) => a.item - b.item;

const strToArray = str => {
  const arr = str
    .split(' ')
    .filter(Boolean)
    .map(Number)
    .slice(1);

  const map = arr.reduce((acc, item, index) => {
    if (!acc[item]) {
      acc[item] = { item, index };
    }

    return acc;
  }, {});

  return Object.values(map).sort(compare);
};

let s;
let a, b, c;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!s) {
    s = Number(param);
    return;
  }

  if (!a) {
    a = strToArray(param);
    return;
  }

  if (!b) {
    b = strToArray(param);
    return;
  }

  if (!c) {
    c = strToArray(param);
  }

  main();
  process.exit(0);
});

const checkResult = () => {
  const results = [];

  for (let i = 0; i < a.length; i++) {
    let k = c.length - 1;
    for (let j = 0; j < b.length;) {
      if (k < 0) break;
      const ab = a[i].item + b[j].item;

      if (ab + c[k].item > s) {
        k--;
        continue;
      }

      if (ab + c[k].item === s) {
        results.push([a[i].index, b[j].index, c[k].index]);
      }

      j++;
    }
  }

  results.sort((a, b) => {
    return a[0] - b[0] ||
      a[1] - b[1] ||
      a[2] - b[2];
  });
  return results.length
    ? results[0].join(' ')
    : -1;
};

const main = () => {
  const result = checkResult();
  console.log(result);
};
