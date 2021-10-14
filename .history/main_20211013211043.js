const api = 'https://5fa3d0d9f10026001618df85.mockapi.io/users';

const inputName = document.querySelector('#name');
const inputAvatar = document.querySelector('#avatar');
const inputLinkWeb = document.querySelector('#link-web');
const inputcompanyName = document.querySelector('#company-name');
const inputcompanyAddress = document.querySelector('#company-address');
const btnSubmit = document.querySelector('.btn-submit');
const btnCancel = document.querySelector('.btn-cancel');

let creatData = {};
let company = {};
inputName.addEventListener('change', () => {
  creatData.name = inputName.value;
});
inputAvatar.addEventListener('change', () => {
  creatData.avatar = inputAvatar.value;
});
inputLinkWeb.addEventListener('change', () => {
  creatData.website = inputLinkWeb.value;
});
inputcompanyName.addEventListener('change', () => {
  company.name = inputcompanyName.value;
});
inputcompanyAddress.addEventListener('change', () => {
  company.adress = inputcompanyAddress.value;
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  creatData.company = company;
  postData(api, creatData)
    .then((result) => console.log(result, 'log'))
    .catch((err) => console.log(err));
  getData(api).then((data) => {
    renderUser(data);
  });
});
async function postData(url = '', postData) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  return response.json();
}

async function getData(url = '') {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}
getData(api).then((data) => {
  renderUser(data);
});

getData(api).then((data) => console.log(data.forEach((item) => item.name)));

async function deleteItem(data) {
  const deleteBtn = document.querySelectorAll('.btn-delete');
  deleteBtn.forEach((item) =>
    item.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const index = data.findIndex((item) => item.id === id);
    })
  );
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
      <button type="submit" class=" btn btn-delete" data-set="${item.id}"><i class="fas fa-eraser"></i>Delete</button>
    </div>
  </div>`;
  });
  return (manageInfor.innerHTML = inforItem.join(''));
}
