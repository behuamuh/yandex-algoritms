const fs = require('fs');
const path = require('path');
const readline = require('readline');

const inFile = path.join(__dirname, 'input.txt');
const outFile = path.join(__dirname, 'output.txt');

const ALL_SEATS = 450;

const rl = readline.createInterface({
  input: fs.createReadStream(inFile),
  output: fs.createWriteStream(outFile),
  terminal: false,
});

const params = [];

rl.on('line', function (data) {
  const param = data.toString().trim();

  params.push(param);
});

const mapParam = (p, index) => {
  const order = index;
  const words = p.split(' ').filter(Boolean);
  const votes = Number(words.pop());
  const name = words.join(' ');
  return { name, votes, order };
};

const printResult = () => {
  const consignments = params.map(mapParam);
  const allVotesCount = consignments.reduce((acc, { votes }) => acc + votes, 0);
  const feq = allVotesCount / ALL_SEATS; // First electoral quotient

  consignments.forEach(consignment => {
    const num = consignment.votes / feq;
    const consignmentSeats = Math.floor(num);
    const remainder = num - consignmentSeats;
    consignment.seats = consignmentSeats;
    consignment.remainder = remainder;
  });

  consignments.sort((a, b) => {
    if (a.remainder < b.remainder) return 1;
    if (a.remainder > b.remainder) return -1;

    return a.votes - b.votes;
  });

  let unallocatedSeats;
  let consignmentIndex = 0;

  while ((unallocatedSeats = ALL_SEATS - consignments.reduce((acc, { seats }) => acc + seats, 0)) > 0) {

    for (let i = 0; i < unallocatedSeats; i++) {
      consignments[consignmentIndex].seats++;
      consignmentIndex = (consignmentIndex + 1) % consignments.length;
    }
  }

  consignments.sort((a, b) => a.order - b.order);

  consignments.forEach(({ name, seats }) => {
    console.log(`${name} ${seats}`);
  });
};

const main = () => {
  printResult();
};

rl.on('close', main);
