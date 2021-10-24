const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const param = data.toString().trim();

  main(param);
  process.exit(0);

});

const isOpenBracket = char => char === '(';

const checkResult = str => {
  const stack = [];
  let result = true;

  for (const char of str) {
    if (isOpenBracket(char)){
      stack.push(char);
      continue;
    }

    const prev = stack.pop();

    if (!isOpenBracket(prev)) {
      result = false;
      break;
    }
  }

  if (stack.length > 0) result = false;

  return result ? 'YES' : 'NO';
};

const main = param => {
  const result = checkResult(param);
  console.log(result);
};
