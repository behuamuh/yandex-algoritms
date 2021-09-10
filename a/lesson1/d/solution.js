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
    // [persons[p1], persons[p2]] = [p[p2], p1];
    swap(p1, p2, false);
  }
};

const swap = (p1, p2, print = true) => {
  [persons[p1], persons[p2]] = [persons[p2], persons[p1]];

  if (print) {
    console.log(`${p1} ${p2}`);
  }
};

const reSwap = (p1, p2) => {
  swap(p1, n - 1);
  swap(p2, n);
  swap(p1, n);
  swap(p2, n - 1);
};

const restorePersons = () => {
  for (let i = 1; i < n - 1; i++) {
    if (persons[i] === i) continue;

    const position = persons.indexOf(i);
    reSwap(position, i);
  }

  if (persons[n] !== n) {
    swap(n - 1, n);
  }
};

const main = () => {
  initPersons();
  restorePersons();
  console.log(persons);
};
