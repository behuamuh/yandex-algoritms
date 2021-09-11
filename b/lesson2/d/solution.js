const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let l;
let k;

rl.on('line', function (data) {
  const param = data
    .toString()
    .trim();

  if (!l) {
    [l, k] = strToArray(param);
    return;
  }

  main(param);
  process.exit(0);
});

const search = (n, arr, left = true) => {
  let l = 0;
  let r = arr.length - 1;
  let m;

  while (l < r - 1) {
    m = l + Math.floor((r - l) / 2);

    if (arr[m] === n) {
      return m;
    }

    if (arr[m] >= n) {
      r = m;
    } else {
      l = m;
    }
  }

  return left ? l : r;
};

const checkBlocks = blocks => {
  let lMiddle;
  let rMiddle;

  if (l % 2 !== 0) {
    lMiddle = rMiddle = Math.floor(l / 2);
  } else {
    lMiddle = Math.floor(l / 2)  - 1;
    rMiddle = Math.floor(l / 2);
  }

  const lIndex = search(lMiddle, blocks);
  const rIndex = search(rMiddle, blocks, false);

  const lBlock = blocks[lIndex];
  const rBlock = blocks[rIndex];

  if (l % 2 !== 0 && (lBlock === lMiddle || rBlock === lMiddle)) {
    console.log(lMiddle);
    return;
  }
  console.log(lBlock, rBlock);
};

const main = param => {
  const blocks = strToArray(param);
  checkBlocks(blocks);
};
