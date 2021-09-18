const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let variants;
let lastAnswer;

const checkAnswer = (nums, answer) => {
  if (answer === 'NO') {
    nums.forEach(num => {
      delete variants[num];
    });

    return;
  }

  const newVariants = nums.reduce((acc, n) => {
    if (n in variants) {
      acc[n] = true;
    }

    return acc;
  }, {});

  variants = newVariants;

};

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!variants) {
    const n = Number(param);
    variants = Array(n).fill(0).reduce((acc, _, index) => {
      acc[index + 1] = true;
      return acc;
    }, {});
    return;
  }

  if (param === 'HELP') {
    main();
    process.exit(0);
  }

  if (param === 'YES' || param === 'NO') {
    checkAnswer(lastAnswer, param);
  }

  lastAnswer = strToArray(param);
});

const getResult = () => {
  const result = Object.keys(variants).join(' ');
  return result;
};

const main = () => {
  const result = getResult();
  console.log(result);
};
