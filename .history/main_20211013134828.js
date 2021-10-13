const api = 'https://5fa3d0d9f10026001618df85.mockapi.io/users';

const data = async () => {
  const res = await fetch(api);
  return res.json();
};
console.log(data);
