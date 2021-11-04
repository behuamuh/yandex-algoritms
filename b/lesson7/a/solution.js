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
    const [start, end] = strToArray(param);
    points.push({ type: 'start', value: start });
    points.push({ type: 'end', value: end });
  });

  points.sort((a, b) => {
    if (a.value !== b.value) return a.value - b.value;

    return a.type === 'start' ? -1 : 1;
  });

  return points;
};

const checkResult = () => {
  const points = getPoints();
  let startedCount = 0;
  let lineStart = 0;
  let result = 0;

  points.forEach(({ type, value }) => {
    const prevStartedCount = startedCount;

    if (type === 'start') {
      startedCount++;
    } else {
      startedCount--;
    }

    const isLineEnd = startedCount === 0;

    if (isLineEnd) {
      result += (value - lineStart);
      return;
    }

    const isLineStart = startedCount === 1 && prevStartedCount === 0;

    if(isLineStart) {
      lineStart = value;
    }
  });

  return result;
};

const main = () => {
  const result = checkResult();
  console.log(result);
};
