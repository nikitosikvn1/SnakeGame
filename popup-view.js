const popupBackground = document.querySelector('.popup_background');
const popupWindow = document.querySelector('.popup');
const openPopup = document.querySelector('.open-popup');
const closePopup = document.querySelector('.close-popup');

openPopup.addEventListener('click', (e) => {
    e.preventDefault();
    popupBackground.classList.add('active');
    popupWindow.classList.add('active');
});

closePopup.addEventListener('click', ()=> {
    popupBackground.classList.remove('active');
    popupWindow.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target === popupBackground) {
        popupBackground.classList.remove('active');
        popupWindow.classList.remove('active');
    }
});