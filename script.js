const score = document.querySelector('.score');
const start = document.querySelector('.start');
const gameArea = document.querySelector('.game-area');
const car = document.createElement('div');
car.classList.add('car');
let count = 150; //расстояние между началом полос дороги

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 2
}


function getQuantityElements(heightElement) {
    return (document.documentElement.clientHeight / heightElement) + 1;
}

function startGame() {
    start.classList.add('hide');

    //Вывод полос дороги
    //getQuantityElements количество полос для анимации
    for (let i = 0; i < getQuantityElements(count); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * count) + 'px';
        line.y = i * count;
        gameArea.appendChild(line);
    }

    for (let i = 0; i < getQuantityElements(50 + setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -500 * setting.traffic * (i + 1);
        //enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = "transparent url('./image/enemy2.png') center / cover no-repeat";
        gameArea.appendChild(enemy);
    }

    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
}

function playGame() {
    console.log('play');
    moveRoad();
    moveEnemy();
    if (setting.start) {
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {

            setting.x += setting.speed;
        }

        if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
}

function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event) {
    event.preventDefault();
    keys[event.key] = false;
}

//Анимация полос дороги
//Получаем все полосы, перебираем
//К каждому положению прибавляем смещение setting.speed, выводим
//Если смещение полосы стало больше высоты экрана, полосу ставим вверх, за экран
function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
        line.y += setting.speed;
        line.style.top = line.y + 'px';
        if (line.y >= document.documentElement.clientHeight) {
            line.y = -75;
        }
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item) {
        item.y += setting.speed / 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -50 * setting.traffic;
            item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        }

    });



}