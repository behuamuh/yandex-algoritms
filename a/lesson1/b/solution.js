const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
const params = [];

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

const getVectorCoords = (a1, a2) => ({
  x: a2.x - a1.x,
  y: a2.y - a1.y,
});

const isSegmentsParallel = (a1, a2, b1, b2) => {
  const { x: ax, y: ay } = getVectorCoords(a1, a2);
  const { x: bx, y: by } = getVectorCoords(b1, b2);

  const result = (ax * by - ay * bx) === 0;
  return result;
};

const isParallelogram = (a, b, c, d) => {
  return (
    isSegmentsParallel(a, b, c, d) && isSegmentsParallel(b, c, a, d)
  ) || (
      isSegmentsParallel(a, c, b, d) && isSegmentsParallel(a, d, b, c)
    ) || (
      isSegmentsParallel(a, c, b, d) && isSegmentsParallel(a, b, c, d)
    );
};

const getAnswer = param => {
  const [ax, ay, bx, by, cx, cy, dx, dy] = param
    .split(' ')
    .filter(Boolean)
    .map(Number);

  return isParallelogram(
    { x: ax, y: ay },
    { x: bx, y: by },
    { x: cx, y: cy },
    { x: dx, y: dy },
  ) ? 'YES' : 'NO';
};

const main = () => {
  params.forEach(param => {
    const answer = getAnswer(param);
    console.log(answer);
  });
};
