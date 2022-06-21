function randomPosition(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

document.addEventListener('DOMContentLoaded', function() {
    // Объявление базовых констант
    const canvas = document.querySelector('#game-field');
    const context = canvas.getContext('2d');
    const pixel = 16;
    let speed = 0;
    console.log(canvas.width, canvas.height);
    // Создание объекта змейки
    let snake = {
        x: randomPosition(0, 35) * pixel,
        y: randomPosition(0, 35) * pixel,

        dx: pixel,
        dy: 0,

        tail: [],
        max_length: 4
    };

    // Создание объекта яблока
    let apple = {
        x: randomPosition(0, 35) * pixel,
        y: randomPosition(0, 35) * pixel
    };

    function loop() {
        requestAnimationFrame(loop);
        if (++speed < 4) {
            return;
        }

        speed = 0;
        context.clearRect(0, 0, canvas.width, canvas.height);

        snake.x += snake.dx;
        snake.y += snake.dy;

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

        context.fillStyle = '#d1173c';
        context.fillRect(apple.x, apple.y, pixel - 1, pixel - 1);

        context.fillStyle = '#04520c';
        snake.tail.forEach(function(part, index) {
            console.log(pixel - 1);
            context.fillRect(part.x, part.y, pixel - 1, pixel - 1);

            if (part.x == apple.x && part.y == apple.y) {
                snake.max_length ++;
                apple.x = randomPosition(0, 35) * pixel;
                apple.y = randomPosition(0, 35) * pixel;
            }

            for (let i = index + 1; i < snake.tail.length; i++) {
                if (part.x === snake.tail[i].x && part.y === snake.tail[i].y) {

                    snake.x = randomPosition(0, 35) * pixel;
                    snake.y = randomPosition(0, 35) * pixel;
                    snake.tail = [];
                    snake.max_length = 4;
                    snake.dx = pixel;
                    snake.dy = 0;

                    apple.x = randomPosition(0, 35) * pixel;
                    apple.y = randomPosition(0, 35) * pixel;
                }
            }
        });
    }
    //requestAnimationFrame(loop);
});