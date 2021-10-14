const api = 'https://5fa3d0d9f10026001618df85.mockapi.io/users';
const manageInfor = document.querySelector('.manage-infor');
const inputName = document.querySelector('#name');
const inputAvatar = document.querySelector('#avatar');
const inputLinkWeb = document.querySelector('#link-web');
const inputcompanyName = document.querySelector('#company-name');
const inputcompanyAddress = document.querySelector('#company-address');
const btnSubmit = document.querySelector('.btn-submit');
const updateBtn = document.querySelector('.update');
const btnCancel = document.querySelector('.btn-cancel');

let createData = {};
let company = {};
let listItems = [];
inputName.addEventListener('change', () => {
  createData.name = inputName.value;
});
inputAvatar.addEventListener('change', () => {
  createData.avatar = inputAvatar.value;
});
inputLinkWeb.addEventListener('change', () => {
  createData.website = inputLinkWeb.value;
});
inputcompanyName.addEventListener('change', () => {
  company.name = inputcompanyName.value;
});
inputcompanyAddress.addEventListener('change', () => {
  company.adress = inputcompanyAddress.value;
  createData.company = company;
});

btnSubmit.addEventListener('click', (e) => {
  updateBtn.style.display = 'none';
  e.preventDefault();
  postData(createData).then(() => getData());
  clearData();
});
btnCancel.addEventListener('click', (e) => {
  e.preventDefault();
  inputName.value = '';
  inputAvatar.value = '';
  inputLinkWeb.value = '';
  inputcompanyAddress.value = '';
  inputcompanyName.value = '';
});
const getData = async () => {
  const res = await fetch(api);
  items = await res.json();
  listItems = [...items];
  renderUser(listItems);
};

getData(api);

const postData = async (createData) => {
  const res = await fetch(api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData),
  });
  alert('you added a new item!');
  return res.json();
};

function renderUser(data) {
  let inforItem = data.map((item) => {
    return ` <div class="infor-item">
    <div class="your-image">
      <img src="${item.avatar}" alt="" class="image">
    </div>
    <div class="infor-desc">
      <span class="name">${item.name}</span>
      <span class="website">${item.website}</span>
      <span class="company-name">${item.company.name}</span>
      <span class="company-address">${item.company.adress}</span>
    </div>
    <div class="button">
      <button type="submit" class="btn btn-update" data-update = "${item.id}">
        <i class="fas fa-pencil-alt"></i>Update</button>
      <button type="submit" class=" btn btn-delete" data-delete="${item.id}"><i class="fas fa-eraser"></i>Delete</button>
    </div>
  </div>`;
  });
  manageInfor.innerHTML = inforItem.join('');
  const btnUpdate = document.querySelectorAll('.btn-update');
  const btnDelete = document.querySelectorAll('.btn-delete');
  btnDelete.forEach((item) => item.addEventListener('click', handleDelete));
  btnUpdate.forEach((item) => item.addEventListener('click', handleUpDate));
}

function handleDelete(e) {
  const id = e.target.dataset.delete;
  fetch(`${api}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then(() => getData());
}

function handleUpDate(e) {
  updateBtn.style.display = 'block';
  btnSubmit.style.display = 'none';
  const id = e.target.dataset.update;
  const itemParent = e.target.parentNode.parentNode;
  inputName.value = itemParent.querySelector('.name').textContent;
  inputAvatar.value = itemParent.querySelector('.image').src;
  inputLinkWeb.value = itemParent.querySelector('.website').textContent;
  inputcompanyName.value =
    itemParent.querySelector('.company-name').textContent;
  inputcompanyAddress.value =
    itemParent.querySelector('.company-address').textContent;
  updateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inputName.value,
        avatar: inputAvatar.value,
        website: inputLinkWeb.value,
        company: {
          name: inputcompanyName.value,
          adress: inputcompanyAddress.value,
        },
      }),
    })
      .then((res) => res.json())
      .then(() => getData());
    clearData();
    updateBtn.style.display = 'none';
    btnSubmit.style.display = 'block';
  });
}
function clearData() {
  inputName.value = '';
  inputAvatar.value = '';
  inputLinkWeb.value = '';
  inputcompanyName.value = '';
  inputcompanyAddress.value = '';
}
