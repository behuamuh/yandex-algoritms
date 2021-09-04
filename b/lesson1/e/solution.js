const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let params = [];

rl.on('line', function (data) {
  const param = data
    .toString()
    .trim();

  params.push(param);

  if (params.length >= 2) {
    main();
    process.exit(0);
  }
});

const calcDistance = (x1, y1, x2, y2) => {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};

const getPoint = (d, x, y) => {
  const isPointInside = x >= 0 && y >= 0 && (x + y) <= d;
  
  if (isPointInside) return 0;
  
  const pa = calcDistance(0, 0, x, y);
  const pb = calcDistance(d, 0, x, y);
  const pc = calcDistance(0, d, x, y);

  if (pa <= pb && pa <= pc) return 1;
  if (pb < pa && pb <= pc) return 2;

  return 3;
};

const main = () => {
  const d = Number(params[0]);
  const [x, y] = params[1].split(' ').map(Number);

  const result = getPoint(d, x, y);

  console.log(result);
};
