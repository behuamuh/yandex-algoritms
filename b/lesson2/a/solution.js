const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();
  const n = Number(param);

  if (!n) {
    main();
    process.exit(0);
  }

  params.push(n);
});

const getMaxCount = () => {
  let max = -Infinity;
  const map = params.reduce((acc, item) => {
    acc[item] = acc[item] || 0;
    acc[item]++;

    if (item > max) max = item;
    return acc;
  }, {});

  return map[max];
};

const main = () => {
  const result = getMaxCount() || 0;
  console.log(result);
};
