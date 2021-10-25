const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, nums, k;
const params = [];

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

  if (!k) {
    k = Number(param);
    return;
  }

  params.push(param);

  if (params.length >= k) {
    main();
    process.exit(0);
  }
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
  nums.sort((a, b) => a - b);
  const result = params.map(param => {
    const [l, r] = strToArray(param);

    if (l > nums[nums.length - 1] || r < nums[0]) return 0;

    let right = rSearch(nums, r);
    let left = lSearch(nums, l);

    return right - left + 1;
  });

  return result.join(' ');
};

const main = () => {
  const result = getResult();
  console.log(result);
};
