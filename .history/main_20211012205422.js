const p = new Promise((resolve, reject) => resolve('hello world'), reject('you failed'));
p.then((message) => console.log('the result is' + message))
.catch(message => console.log('the result is' + message)

