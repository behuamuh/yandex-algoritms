const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

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

const main = () => {
  // console.log(result);
};
