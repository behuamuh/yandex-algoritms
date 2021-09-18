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

rl.on('line', function (data) {
  const param = data.toString().trim();
  params.push(param);

  if (params.length >= 2) {
    main();
    process.exit(0);
  }
});

const getResult = (arr1, arr2) => {
  const map1 = arr1.reduce((acc, item) => {
    acc[item] = true;
    return acc;
  }, {});

  const result = arr2.reduce((acc, item) => map1[item] ? acc + 1 : acc, 0);

  return result;
};

const main = () => {
  const arr1 = strToArray(params[0]);
  const arr2 = strToArray(params[1]);

  const result = getResult(arr1, arr2);
  console.log(result);
};
