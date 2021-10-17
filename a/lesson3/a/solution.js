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
const answers = [];
let variantsCount;

const checkAnswer = nums => {
  let matches = 0;
  
  nums.forEach(n => {
    if (variants[n]) matches++;
  });
  
  const answer = matches > variantsCount / 2 ? 'YES' : 'NO';
  answers.push(answer);

  if (answer === 'NO') {
    nums.forEach(num => {
      delete variants[num];
      variantsCount--;
    });

    return;
  }

  variantsCount = 0;
  const newVariants = nums.reduce((acc, n) => {
    if (n in variants) {
      acc[n] = true;
      variantsCount++;
    }

    return acc;
  }, {});

  variants = newVariants;
};

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!variants) {
    const n = Number(param);
    variantsCount = n;
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

  checkAnswer(strToArray(param));
});

const getResult = () => {
  const result = Object.keys(variants).join(' ');
  return result;
};

const main = () => {
  const result = getResult();
  answers.forEach(a => console.log(a));
  console.log(result);
};
