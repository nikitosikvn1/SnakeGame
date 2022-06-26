function randomPosition(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

if (!localStorage.getItem('record')) {
    localStorage.setItem('record', 0);
}

document.addEventListener('DOMContentLoaded', () => {
    // Объявление базовых констант
    const canvas = document.querySelector('#game-field');
    const context = canvas.getContext('2d');
    const pixel = 16;

    let genRange = 35;
    let speed = 0;
    let score = 0;

    let snakeColor = '#04520c';
    let appleColor = '#d1173c';

    const current_out = document.querySelector('#current-score');
    const record_out = document.querySelector('#record-score');

    current_out.innerHTML = `Points scored: ${score}`;
    record_out.innerHTML = `Your record: ${localStorage.getItem('record')}`;

    // Создание объекта змейки
    const snake = {
        x: randomPosition(0, genRange) * pixel,
        y: randomPosition(0, genRange) * pixel,

        dx: pixel,
        dy: 0,

        tail: [],
        max_length: 4
    };

    // Создание объекта яблока
    const apple = {
        x: randomPosition(0, genRange) * pixel,
        y: randomPosition(0, genRange) * pixel
    };

    const applyButton = document.querySelector('#confirm');

    // Получаем событие нажатия на кнопку изменения настроек и применяем их
    applyButton.addEventListener('click', (e) => {
        e.preventDefault();

        const size = Number(document.querySelector('#field-size').value);
        snakeColor = document.querySelector('#snake-select').value;
        appleColor = document.querySelector('#apple-select').value;
        canvas.style.background = document.querySelector('#field-select').value;

        if (size !== Number(canvas.getAttribute('width'))) {
            canvas.setAttribute('width', size);
            canvas.setAttribute('height', size);

            genRange = size / pixel;

            apple.x = randomPosition(0, genRange) * pixel;
            apple.y = randomPosition(0, genRange) * pixel;
        }
    });

    // Игровой цикл
    function loop() {
        requestAnimationFrame(loop);

        // Код выполняется каждый 4й раз, что позволяет снизить частоту кадров до 15
        if (++speed < 4) {
            return;
        }

        speed = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

        // Если змейка достигла края поля по вертикали или горизонтили, продолжаем движение с противополжной стороны
        if (snake.x < 0) {
            snake.x = canvas.width - pixel;
        } else if (snake.x >= canvas.width) {
            snake.x = 0;
        }

        if (snake.y < 0) {
            snake.y = canvas.height - pixel;
        } else if (snake.y >= canvas.height) {
            snake.y = 0;
        }

        snake.tail.unshift({ x: snake.x, y: snake.y });

        if (snake.tail.length > snake.max_length) {
            snake.tail.pop();
        }

        // Рисуем яблоко
        context.fillStyle = appleColor;
        context.fillRect(apple.x, apple.y, pixel - 1, pixel - 1);

        // Перебираем части змейки и отрисовываем на полотне
        context.fillStyle = snakeColor;
        snake.tail.forEach((part, index) => {
            context.fillRect(part.x, part.y, pixel - 1, pixel - 1);

            // Если координаты змейки совпали с коор. яблока, то увеличиваем макс длину и рисуем новое
            if (part.x == apple.x && part.y == apple.y) {
                snake.max_length ++;
                score += 10;
                current_out.innerHTML = `Points scored: ${score}`;
                apple.x = randomPosition(0, genRange) * pixel;
                apple.y = randomPosition(0, genRange) * pixel;
            }

            // Если змейка врезалась в себя начинаем игру сначала
            for (let i = index + 1; i < snake.tail.length; i++) {
                if (part.x === snake.tail[i].x && part.y === snake.tail[i].y) {
                    if (score > localStorage.getItem('record')) {
                        localStorage.setItem('record', score);
                        record_out.innerHTML = `Your record: ${localStorage.getItem('record')}`;
                    }

                    score = 0;
                    current_out.innerHTML = `Points scored: ${score}`;

                    snake.x = randomPosition(0, genRange) * pixel;
                    snake.y = randomPosition(0, genRange) * pixel;
                    snake.tail = [];
                    snake.max_length = 4;
                    snake.dx = pixel;
                    snake.dy = 0;

                    apple.x = randomPosition(0, genRange) * pixel;
                    apple.y = randomPosition(0, genRange) * pixel;
                }
            }
        });
    }

    // Получаем событие нажатия на кнопку и меняем направление
    document.addEventListener('keydown', (key) => {
        let direction = key.code;

        if (direction === 'ArrowLeft' && snake.dx === 0) {
            snake.dx = -pixel;
            snake.dy = 0;
        } else if (direction === 'ArrowRight' && snake.dx === 0) {
            snake.dx = pixel;
            snake.dy = 0;
        } else if (direction === 'ArrowUp' && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = -pixel;
        } else if (direction === 'ArrowDown' && snake.dy === 0) {
            snake.dx = 0;
            snake.dy = pixel;
        }
    });

    loop();
});


