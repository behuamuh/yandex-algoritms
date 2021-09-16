const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let word;
let target;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!word) {
    word = param;
    return;
  }

  target = param;
  main();
  process.exit(0);
});

const getResult = () => {
  const proportion = Math.ceil(target.length / word.length);

  word = word.repeat(proportion);

  for (let i = target.length; i >= 0; i--) {
    if (word.endsWith(target.slice(0, i))) {
      return target.slice(i);
    }
  }
};

const main = () => {
  const result = getResult();
  console.log(result);
};
