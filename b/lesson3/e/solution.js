const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean)
  .map(Number);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let m, n;
const answers = [];
const cars = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!m) {
    m = Number(param);
    return;
  }

  if (answers.length < m) {
    answers.push(param);
    return;
  }

  if (!n) {
    n = Number(param);
    return;
  }

  cars.push(param);

  if (cars.length >= n) {
    main();
    process.exit(0);
  }
});

const check = (car, answer) => {
  return [...answer].every(s => car.includes(s));
};

const printResult = () => {
  const map = {};

  cars.forEach(car => {
    let count = 0;
    answers.forEach(answer => {
      if (check(car, answer)) count++;
    });

    map[car] = count;
  });

  const max = Math.max(...Object.values(map));

  cars.forEach(car => {
    if (map[car] === max) {
      console.log(car);
    }
  });
};

const main = () => {
  printResult();
};
