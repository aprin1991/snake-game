// Define Html elements
const board = document.getElementById('game-board');
const instructionText = document.querySelector('#instruction-text');
const logo = document.querySelector('#logo');
const caption = document.querySelector('.caption');

const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFoodPositon();
let direction = 'right';
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake , food
const draw = () => {
  board.innerHTML = '';
  drawSnake();
  drawFood();
  updateScore();
};

// Draw snake
function drawSnake() {
  snake.forEach((segment) => {
    const snakeElement = createGameElement('div', 'snake');
    setPosition(snakeElement, segment);
    board.appendChild(snakeElement);
  });
}

// Create a snake or food cube
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  element.id = className;
  return element;
}

// Set position
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

//Draw Food
function drawFood() {
  const foodElement = createGameElement('div', 'food');
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

//generateFoodPositon
function generateFoodPositon() {
  const x = Math.floor(Math.random() * gridSize + 1);
  const y = Math.floor(Math.random() * gridSize + 1);
  return { x, y };
}

// Move snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case 'right':
      head.x++;
      break;
    case 'left':
      head.x--;
      break;
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    default:
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFoodPositon();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

function startGame() {
  gameStarted = true;
  caption.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Keypress Listener

function handleKeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.code === ' ')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case 'ArrowUp':
        direction = 'up';
        break;
      case 'ArrowDown':
        direction = 'down';
        break;
      case 'ArrowLeft':
        direction = 'left';
        break;
      case 'ArrowRight':
        direction = 'right';
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyPress);

function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFoodPositon();
  direction = 'right';
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, '0');
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  const snakeCube = document.getElementById('snake');
  const foodCube = document.getElementById('food');
  console.log(snakeCube);
  instructionText.style.display = 'block';
  caption.style.display = 'flex';
  snakeCube.classList.add('hidden');
  foodCube.classList.add('hidden');
  snakeCube.style.display = 'none';
  foodCube.style.display = 'none';
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, '0');
  }
  highScoreText.style.display = 'block';
}
