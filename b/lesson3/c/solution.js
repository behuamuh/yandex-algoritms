const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const param = data.toString().trim();

  main(param);
  process.exit(0);
});

const getResult = arr => {
  const map = arr.reduce((acc, item) => {
    acc[item] = acc[item] || 0;
    acc[item]++;
    return acc;
  }, {});

  const result = [];

  arr.forEach(n => {
    if (map[n] !== 1) return;
    
    result.push(n);
  });

  return result.join(' ');
};

const main = param => {
  const arr = strToArray(param);

  const result = getResult(arr);
  console.log(result);
};
