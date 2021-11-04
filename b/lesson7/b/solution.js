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
let n;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  params.push(param);

  if (params.length >= n) {
    main();
    process.exit(0);
  }
});

const getPoints = () => {
  const points = [];
  params.forEach(param => {
    const [start, time] = strToArray(param);
    points.push({ type: 'start', value: start });
    points.push({ type: 'end', value: start + time });
  });

  points.sort((a, b) => {
    if (a.value !== b.value) return a.value - b.value;

    return a.type === 'end' ? -1 : 1;
  });

  return points;
};

const checkResult = () => {
  const points = getPoints();
  let cargoCount = 0;
  let max = 0;

  points.forEach(({ type }) => {
    if (type === 'start') {
      cargoCount++;
    } else {
      cargoCount--;
    }

    max = Math.max(cargoCount, max);
  });

  return max;
};

const main = () => {
  const result = checkResult();
  console.log(result);
};
