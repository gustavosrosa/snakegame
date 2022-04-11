// Selecionou elemento 'snake'
let canvas = document.getElementById('snake');

// Renderizando o game
let context = canvas.getContext('2d');

let box = 32;

let snake = [];

snake[0] = { 
    x: 8 * box,
    y: 8 * box
}

// Criando background
function criarBG() {
    context.fillStyle = 'lightgreen';
    context.fillRect(0, 0, 16 * box, 16 * box);
}

// Direção
let direction = 'right';

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box , // Aparecimento de pontos aleatórios
    y: Math.floor(Math.random() * 15 + 1) * box   // Aparecimento de pontos aleatórios
}

// Criando snake

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

// Função dos pontos
function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

// Detecta clique
// Chama update e declara como evento aperto de tecla
document.addEventListener('keydown', update);

// Muda se a direção for contrária
function update(event) {
    if (event.keyCode === 37 && direction != 'right') {
        direction = 'left';
    }
    if (event.keyCode === 38 && direction != 'down') {
        direction = 'up';
    }
    if (event.keyCode === 39 && direction != 'left') {
        direction = 'right';
    }
    if (event.keyCode === 40 && direction != 'up') {
        direction = 'down';
    }
}
// Inicializando game
function iniciarJogo() {

    // Plano cartesiano

    if (snake[0].x > 15 * box && direction == 'right') {
        snake[0].x = 0;
    }
    if (snake[0].x < 0 && direction == 'left') {
        snake[0].x = 16 * box;
    }
    if (snake[0].y > 15 * box && direction == 'down') {
        snake[0].y = 0;
    }
    if (snake[0].y < 0 && direction == 'up') {
        snake[0].y = 16 * box;
    }

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            // PARAR!
            clearInterval(jogo);
            alert('GAME OVER!')
        }
    }

    criarBG();
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Referenciando direções

    if (direction == 'right') {
        snakeX += box;
    }
    if (direction == 'left') {
        snakeX -= box;
    }
    if (direction == 'up') {
        snakeY -= box;
    }
    if (direction == 'down') {
        snakeY += box;
    }

    if (snakeX != food.x || snakeY != food.y) {
        // Removendo último elemento em função do movimento da snake
        snake.pop()
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box ; // Aparecimento de pontos aleatórios
        food.y = Math.floor(Math.random() * 15 + 1) * box   // Aparecimento de pontos aleatórios
    }
    


    let newHead = {
        x: snakeX ,
        y: snakeY
    }

    snake.unshift(newHead);
}

// Intervalo de 100ms para inicialização do jogo
let jogo = setInterval(iniciarJogo, 100);

// Ajuda ao usuário

function clicou() {
    document.getElementById('agradecimento').innerHTML = '<p>Obrigado por jogar! Para mover a snake, use as setas do teclado'
}
