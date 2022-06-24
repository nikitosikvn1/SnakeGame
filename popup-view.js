const back = document.querySelector('.popup_background');
const popup = document.querySelector('.popup');
const openPopup = document.querySelector('.open-popup');
const closePopup = document.querySelector('.close-popup');

openPopup.addEventListener('click', (e) => {
    e.preventDefault();
    back.classList.add('active');
    popup.classList.add('active');
});

closePopup.addEventListener('click', ()=> {
    back.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target === back) {
        back.classList.remove('active');
        popup.classList.remove('active');
    }
});