// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the size of each grid cell and the canvas size
const gridSize = 20;
const canvasSize = 400;

// Initialize the snake with one segment at the starting position
let snake = [{ x: gridSize * 5, y: gridSize * 6 }];

// Set the initial direction of the snake to the right
let direction = { x: gridSize, y: 0 };

// Initialize the food position
let food = { x: gridSize * 10, y: gridSize * 10 };

// Initialize the score
let score = 0;

// Define an array of obstacles
let obstacles = [
    { x: gridSize * 7, y: gridSize * 7 },
    { x: gridSize * 12, y: gridSize * 12 },
    { x: gridSize * 15, y: gridSize * 5 }
];

// Function to draw a rectangle (used for snake segments and food)
function drawRect(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, gridSize, gridSize);
}

function drawSnake() {
    snake.forEach(segment => drawRect(segment.x, segment.y, 'lime'));
}

function drawFood() {
    drawRect(food.x, food.y, 'red');
}

// Function to draw the obstacles on the canvas
function drawObstacles() {
    obstacles.forEach(obstacle => drawRect(obstacle.x, obstacle.y, 'gray'));
}

// Function to update the score display
function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

// Function to move the snake
function moveSnake() {
    let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Wrap the snake's position around the canvas edges
    if (head.x < 0) {
        head.x = canvasSize - gridSize;
    } else if (head.x >= canvasSize) {
        head.x = 0;
    } else if (head.y < 0) {
        head.y = canvasSize - gridSize;
    } else if (head.y >= canvasSize) {
        head.y = 0;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        // Increase score and place new food if snake eats the current food
        score++;
        placeFood();
        updateScore(); // Update the score display
    } else {
        // Remove the last segment of the snake if no food is eaten
        snake.pop();
    }
}

// Function to place food at a random position on the canvas
function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

// Function to check if the snake has collided with itself or obstacles
function checkCollision() {
    const head = snake[0];

    // Check if the snake's head has collided with its body
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    // Check if the snake's head has collided with any obstacles
    for (let obstacle of obstacles) {
        if (head.x === obstacle.x && head.y === obstacle.y) {
            return true;
        }
    }

    return false;
}

// Function to run the game loop
function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        document.location.reload();
    }

    // Clear the canvas and redraw the snake, food, and obstacles
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    drawObstacles();
}

// Function to change the direction of the snake based on arrow key input
function changeDirection(event) {
    const keyPressed = event.key;
    console.log(`Key pressed: ${keyPressed}`); // Add this line to debug

    // Change direction based on the arrow key pressed
    if (keyPressed === 'ArrowLeft' && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 'ArrowUp' && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 'ArrowRight' && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    } else if (keyPressed === 'ArrowDown' && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    }
}

// Add event listener for keydown events to change the snake's direction
document.addEventListener('keydown', changeDirection);

// Set the game loop to run every 100 milliseconds
setInterval(gameLoop, 100);