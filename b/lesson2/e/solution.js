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

rl.on('line', function (data) {
  const param = data
    .toString()
    .trim();

  if (!n) {
    n = Number(param);
    return;
  }

  main(param);
  process.exit(0);
});

const getResult = files => {
  const max = Math.max(...files);
  const maxIndex = files.findIndex(n => n === max);

  let result = 0;

  for (let i = 0; i < files.length; i++) {
    if (i === maxIndex) continue;

    result += files[i];
  }

  return result;
};

const main = param => {
  const files = strToArray(param);
  const result = getResult(files);

  console.log(result);
};
