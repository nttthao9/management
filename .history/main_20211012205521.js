const p = new Promise((resolve) => resolve('hello world'));
p.then((message) => console.log('the result is' + message)).catch((message) =>
  console.log('the result is' + message)
);
