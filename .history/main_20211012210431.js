const p = new Promise((resolve) => {
  if (1 > 2) {
    resolve([1, 2])
  } else {
    reject('false');
}}));
p.then((message) => console.log('the result is ' + message)).catch((message) =>
  console.log('the result is' + message)
);
