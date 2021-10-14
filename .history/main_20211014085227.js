const api = 'https://5fa3d0d9f10026001618df85.mockapi.io/users';
const manageInfor = document.querySelector('.manage-infor');
const inputName = document.querySelector('#name');
const inputAvatar = document.querySelector('#avatar');
const inputLinkWeb = document.querySelector('#link-web');
const inputcompanyName = document.querySelector('#company-name');
const inputcompanyAddress = document.querySelector('#company-address');
const btnSubmit = document.querySelector('.btn-submit');
const btnCancel = document.querySelector('.btn-cancel');

let createData = {};
let company = {};
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

});
const getData = async () => {
  const res = await fetch(api);
  return res.json();
};
getData(api).then((result) => renderUser(result));

const postData = async () => {
  const 
}
function renderUser(data) {
  let inforItem = data.map((item) => {
    return ` <div class="infor-item">
    <div class="your-image">
      <img src="${item.avatar}" alt="">
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
  // btnUpdate.addEventListener('click', handleUpdate(data));
}

function handleDelete(e) {
  const id = e.target.dataset.delete;
  console.log(id);
  fetch(`${api}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((result) => renderUser(result));
}
