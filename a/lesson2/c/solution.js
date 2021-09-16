const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

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

const getAnswer = () => {
  const figure = [[], [], [], [], [], [], [], []];
  let neighbors = 0;

  params.forEach(param => {
    const [h, v] = strToArray(param);
    figure[h - 1][v - 1] = true;
  });

  for (let h = 0; h < 8; h++) {
    for (let v = 0; v < 8; v++) {
      if (!figure[h][v]) continue;

      if (figure[h + 1] && figure[h + 1][v]) neighbors++;
      if (figure[h][v + 1]) neighbors++;
    }
  }

  return n * 4 - neighbors * 2;
};

const main = () => {
  const answer = getAnswer();
  console.log(answer);
};
