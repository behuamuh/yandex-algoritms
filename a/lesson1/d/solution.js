const readline = require('readline');

const strToArray = str => str
  .split(' ')
  .filter(Boolean);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n, m;
let persons;
const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    [n, m] = strToArray(param).map(Number);
    return;
  }

  params.push(param);

  if (params.length >= m) {
    main();
    process.exit(0);
  }
});

const initPersons = () => {
  persons = Array.from({ length: n + 1 }, (_, i) => i);

  for (const param of params) {
    const [p1, p2] = strToArray(param).map(Number);
    swap(p1, p2, false);
  }
};

const swap = (p1, p2, print = true) => {
  [persons[p1], persons[p2]] = [persons[p2], persons[p1]];

  if (print) {
    console.log(`${p1} ${p2}`);
  }
};

const tmp = i => {
  swap(i, n - 1);

  while (persons[persons[n - 1]] !== i) {
    swap(n - 1, persons[n - 1]);
  }

  swap(persons[n - 1], n);
  swap(i, n);
  swap(n - 1, persons[n - 1]);
};

const restorePersons = () => {
  for (let i = 1; i < n - 1; i++) {
    if (i === persons[i]) continue;

    tmp(i);
  }

  if (persons[n] !== n) {
    swap(n - 1, n);
  }
};

const main = () => {
  initPersons();
  restorePersons();
};
