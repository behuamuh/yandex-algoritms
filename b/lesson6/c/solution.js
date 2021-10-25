const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let a0, a1, a2, a3;

rl.on('line', function (data) {
  const param = data.toString().trim();

  [a0, a1, a2, a3] = strToArray(param);

  main();
  process.exit(0);
});

const search = () => {
  const a = a1 / a0;
  const b = a2 / a0;
  const c = a3 / a0;
  
  const p = b - ((a ** 2) / 3);
  const q = c + (2 * (a ** 3) / 27) - (a * b / 3);
  const t1 = - q / 2 - Math.sqrt(((q ** 2) / 4) + ((p ** 3) / 27));
  const t2 = - q / 2 + Math.sqrt(((q ** 2) / 4) + ((p ** 3) / 27));
  const y = Math.cbrt(t1) + Math.cbrt(t2);
  const x = y - a / 3;

  return x;
};

const getResult = () => {
  const x = search();
  console.log(x);
};

const main = () => {
  getResult();
};
