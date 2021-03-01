const hamBtn = document.querySelector('#hamBtn');
const sidebar = document.querySelector('.sidebar');
const clsBtn = document.querySelector('#hamClsBtn')

hamBtn.addEventListener('click', () => {
  sidebar.classList.add('sidebar--active');
})
clsBtn.addEventListener('click', () => {
  sidebar.classList.remove('sidebar--active'); 
})
