// Define Html elements
const board = document.getElementById('game-board');

// Define game variables
const gridSize = 20;
const snake = [{ x: 15, y: 10 }];
const food = generateFoodPositon();
const direction = 'up';
let gameInterval;
const gameSpeedDelay = 200;

// Draw game map, snake , food
const draw = () => {
  board.innerHTML = '';
  drawSnake();
  drawFood();
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
  return element;
}

// Set position
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

draw();

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
    case 'bottom':
      head.y++;
      break;
    default:
      break;
  }
  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    food = generateFoodPositon();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}
