const api = 'https://5fa3d0d9f10026001618df85.mockapi.io/users';

const inputName = document.querySelector('#name');
const inputAvatar = document.querySelector('#avatar');
const inputLinkWeb = document.querySelector('#link-web');
const inputcompanyName = document.querySelector('#company-name');
const inputcompanyAddress = document.querySelector('#company-address');
const btnSubmit = document.querySelector('.btn-submit');
const btnCancel = document.querySelector('.btn-cancel');

let creatData = {};
const name = inputName.addEventListener('change', () => {
  return inputName.value;
});
const avatar = inputAvatar.addEventListener('change', () => {
  return inputAvatar.value;
});
const link = inputLinkWeb.addEventListener('change', () => {
  return inputLinkWeb.value;
});
const companyname = inputcompanyName.addEventListener('change', () => {
  let company = {};
  company.name = inputcompanyName.value;
  return company.name;
});
const companyAddress = inputcompanyAddress.addEventListener('change', () => {
  let company = {};
  company.adress = inputcompanyAddress.value;
  return company.adress;
});
btnSubmit.addEventListener('submit', () => {
  creatData.name = name;
  console.log(creatData);
});

async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

getData(api).then((data) => {
  renderUser(data); // JSON data parsed by `data.json()` call
});
async function postData(url = '', postData) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(postData),
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
const manageInfor = document.querySelector('.manage-infor');
async function renderUser(data) {
  let inforItem = data.map((item) => {
    return ` <div class="infor-item">
    <div class="your-image">
      <img src="${item.avatar}" alt="">
    </div>
    <div class="infor-desc">
      <span class="name">${item.name}</span>
      <span class="name">${item.website}</span>
      <span class="name">${item.company.name}</span>
      <span class="name">${item.company.adress}</span>
    </div>
    <div class="button">
      <button type="submit" class="btn btn-update">
        <i class="fas fa-pencil-alt"></i>Update</button>
      <button type="submit" class=" btn btn-delete"><i class="fas fa-eraser"></i>Delete</button>
    </div>
  </div>`;
  });
  return (manageInfor.innerHTML = inforItem.join(''));
}
