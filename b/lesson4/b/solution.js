const fs = require('fs');
const path = require('path');

const strToArray = str => str
  .split(' ')
  .filter(Boolean);

const inFile = path.join(__dirname, 'input.txt');
const outFile = path.join(__dirname, 'output.txt');

const params = fs.readFileSync(inFile, { encoding: 'utf8' });
fs.writeFileSync(outFile, '');

const map = params
  .split('\n')
  .filter(Boolean)
  .reduce((acc, param) => {
    const [d, a] = strToArray(param);
    acc[d] = acc[d] || 0;
    acc[d] += Number(a);
    return acc;
  }, {});

Object.keys(map).sort()
  .forEach(d => {
    const message = `${d} ${map[d]}\n`;
    fs.writeFileSync(outFile, message, { flag: 'a+' });
  });
