const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const params = [];

rl.on('line', function (data) {
  const param = Number(data.toString().trim());
  params.push(param);

  if (params.length >= 3) {
    main();
    process.exit(0);
  }
});

const getVerdict = (r, i, c) => {
  switch (i) {
    case 0:
      return r === 0 ? c : 3;
    case 1:
      return c;
    case 4:
      return r === 0 ? 4 : 3;
    case 6:
      return 0;
    case 7:
      return 1;
    default:
      return i;
  }
};

const main = () => {
  const [r, i, c] = params;

  const verdict = getVerdict(r, i, c);

  console.log(verdict);
};
