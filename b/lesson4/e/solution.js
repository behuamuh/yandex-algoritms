const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n;
const posts = {};
let postIndex = 1;

rl.on('line', function (data) {
  const param = data.toString().trim();

  if (!n) {
    n = Number(param);
    return;
  }

  posts[postIndex] = posts[postIndex] || { id: postIndex };
  const post = posts[postIndex];

  if (typeof post.parentId === 'undefined') {
    post.parentId = Number(param);
    return;
  }

  if (post.parentId === 0) {
    if (!post.theme) {
      post.theme = param;
      return;
    }
  }

  post.text = param;
  postIndex++;

  if (postIndex > n) {
    main();
    process.exit(0);
  }
});

const getParent = post => {
  let current = post;
  while (current.parentId !== 0) {
    current = posts[current.parentId];
  }
  return current;
};

const printResult = () => {
  const map = Object.values(posts).reduce((acc, post) => {
    if (post.parentId === 0) {
      acc[post.id] = {
        theme: post.theme,
        count: 1,
      };
    } else {
      const parent = getParent(post);
      acc[parent.id].count++;
    }

    return acc;
  }, {});
  const max = Object.values(map).reduce((acc, item) => Math.max(acc, item.count), 0);
  const result = Object.values(map)
    .find(post => post.count === max);

  console.log(result.theme);
};

const main = () => {
  printResult();
};
