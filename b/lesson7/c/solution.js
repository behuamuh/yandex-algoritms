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
let m;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!m) {
    m = Number(param);
    return;
  }

  if (param.replace(/ /g, '') === '00') {
    main();
    process.exit(0);
  }

  params.push(param);
});

const getLines = () => {
  const lines = params.map(strToArray);

  lines.sort((a, b) => a[0] - b[0]);

  return lines;
};

const checkResult = () => {
  const lines = getLines();
  let result = [];
  let point = 0;
  let maxLine = null;

  const updateResult = () => {
    result.push(maxLine);
    point = maxLine[1];
    maxLine = null;
  };

  for (let i = 0; i < lines.length; i++) {
    if (point >= m) break;

    if (lines[i][0] > point) {
      if (!maxLine) break;

      updateResult();
      i--;
    }

    if (lines[i][1] <= point) {
      continue;
    }

    if (!maxLine || lines[i][1] > maxLine[1]) {
      maxLine = lines[i];
    }
    
    if (i === lines.length - 1 && maxLine) {
      updateResult();
    }
  }

  if (point >= m) {
    console.log(String(result.length));
    result.forEach(r => console.log(r.join(' ')));
  } else {
    console.log('No solution');
  }
};

const main = () => {
  checkResult();
};
