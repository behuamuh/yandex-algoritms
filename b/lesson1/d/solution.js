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

const getScoolCoord = coords => {
  const middleIndex = Math.floor(coords.length / 2);

  return coords[middleIndex];
};

const main = () => {
  const coords = params[1].split(' ').map(Number);
  const result = getScoolCoord(coords);

  console.log(result);
};
