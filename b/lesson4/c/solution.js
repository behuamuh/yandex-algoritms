const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inFile = path.join(__dirname, 'input.txt');
const outFile = path.join(__dirname, 'output.txt');

const rl = readline.createInterface({
    input: fs.createReadStream(inFile),
    output: fs.createWriteStream(outFile),
    terminal: false,
});

const acc = {};

rl.on('line', line => {
  line.split(' ')
    .filter(Boolean)
    .forEach(word => {
      acc[word] = acc[word] || 0;
      acc[word] += 1;
    });
});

fs.writeFileSync(outFile, '');

rl.on('close', () => {
  Object.entries(acc)
  .sort((a, b) =>{
    if (a[1] > b[1]) return -1;
    if (a[1] < b[1]) return 1;

    return a[0] > b[0] ? 1 : -1;
  })
  .forEach(d => {
    const message = `${d[0]}\n`;
    fs.writeFileSync(outFile, message, { flag: 'a+' });
  });
});
