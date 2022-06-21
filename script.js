function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', function() {
    // Объявление базовых констант
    const canvas = document.querySelector('#game-field');
    const context = canvas.getContext('2d');
    const pixel = 16;
    const speed = 0;

    // Создание объекта змейки
    let snake = {
        x: randomInteger(0, 35) * pixel,
        y: randomInteger(0, 35) * pixel,

        dx: pixel,
        dy: 0,

        tail: [],
        max_length: 4
    };

    // Создание объекта яблока
    let apple = {
        x: randomInteger(0, 35) * pixel,
        y: randomInteger(0, 35) * pixel
    };

});