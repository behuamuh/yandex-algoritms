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
const twoPi = 2 * Math.PI;
let r1max = 0;
let r2min = Infinity;
let fs;
let index = 0;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    fs = Array(2 * n);
    return;
  }

  const [r1, r2, f1, f2] = strToArray(param);
  r1max = Math.max(r1max, r1);
  r2min = Math.min(r2min, r2);

  fs.push({ f: f1, open: true, index });
  fs.push({ f: f2, open: false, index });
  index++;

  if (index >= n) {
    main();
    process.exit(0);
  }
});

const checkResult = () => {
  fs.sort((a, b) => a.f - b.f);

  const opens = new Set();

  let lastOpen;

  fs.forEach(({ open, index, f }) => {
    if (open) {
      opens.add(index);

      if (opens.size === n) {
        lastOpen = f;
      }
    } else {
      opens.delete(index);
    }
  });

  let fres = 0;

  fs.forEach(({ f, open, index }) => {
    if (open) {
      opens.add(index);

      if (opens.size === n) {
        lastOpen = f;
      }
    } else {
      if (opens.size === n) {
        fres += (twoPi + f - lastOpen) % twoPi;
      }
      opens.delete(index);
    }
  });

  let result = fres / 2 * (r2min ** 2 - r1max ** 2);
  console.log(result);
};

const main = () => {
  checkResult();
};

// Алгоритм верный, но на ноде решение не проходит, сдал на пайтоне, 
// причем только на версии 3.9.1
