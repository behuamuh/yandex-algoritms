const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', function (data) {
  const params = data
    .toString()
    .trim()
    .split(' ')
    .map(Number);

  main(params);
  process.exit(0);
});

const getMaxDistance = buildings => {
  const getDistance = index => {
    let result = Infinity;
    for (let i = index - 1; i >= 0; i--) {
      if (buildings[i] === 2) {
        result = Math.min(index - i, result);
        break;
      } 
    }

    for (let i = index + 1; i < buildings.length; i++) {
      if (buildings[i] === 2) {
        result = Math.min(i - index, result);
        break;
      } 
    }

    return result;
  };

  let result = 0;

  for (let i = 0; i < buildings.length; i++) {
    if (buildings[i] === 1) result = Math.max(result, getDistance(i));
  }

  return result;
};

const main = params => {
  const result = getMaxDistance(params);
  console.log(result);
};
