const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, nums, m, asks;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  if (!nums) {
    nums = strToArray(param);
    return;
  }

  if (!m) {
    m = Number(param);
    return;
  }

  if (!asks) {
    asks = strToArray(param);
  }

  main();
  process.exit(0);
});

const lSearch = (arr, num) => {
  let l = 0;
  let r = arr.length - 1;
  let m;

  while (l < r) {
    m = Math.floor((r - l) / 2) + l;

    if (arr[m] >= num) {
      r = m;
    } else {
      l = m + 1;
    }

  }

  return l;
};

const rSearch = (arr, num) => {
  let l = 0;
  let r = arr.length - 1;
  let m;

  while (l < r) {
    m = Math.floor((r - l) / 2) + 1 + l;

    if (arr[m] <= num) {
      l = m;
    } else {
      r = m - 1;
    }
  }

  return l;
};

const getResult = () => {
  asks.forEach(ask => {

    let right = rSearch(nums, ask);
    let left = lSearch(nums, ask);

    const result = nums[right] === ask
      ? [left + 1, right + 1]
      : [0, 0];

    console.log(result.join(' '));
  });
};

const main = () => {
  getResult();
};
