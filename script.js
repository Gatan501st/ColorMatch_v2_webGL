// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera
camera.position.z = 10;

// Add lighting
const light = new THREE.AmbientLight(0xffffff); // Soft white light
scene.add(light);

// Define the game area boundaries
const gameAreaWidth = 16;  // Adjust as needed
const gameAreaHeight = 16; // Adjust as needed
const boundaryColor = 0xf8f9fa; // Dark gray for the game area

// Create the game area background
const gameAreaGeometry = new THREE.PlaneGeometry(gameAreaWidth, gameAreaHeight);
const gameAreaMaterial = new THREE.MeshBasicMaterial({ color: boundaryColor });
const gameArea = new THREE.Mesh(gameAreaGeometry, gameAreaMaterial);
gameArea.position.set(0, 0, -0.1); // Slightly behind other objects
scene.add(gameArea);

// Add a border around the game area
const borderGeometry = new THREE.EdgesGeometry(gameAreaGeometry);
const borderMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // White border
const border = new THREE.LineSegments(borderGeometry, borderMaterial);
gameArea.add(border);

// Create the player circle
const circleGeometry = new THREE.CircleGeometry(0.5, 32); // Radius 0.5
const circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Yellow color
const circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.position.y = -gameAreaHeight / 2 + 1; // Place near the bottom of the game area
scene.add(circle);

// Falling objects (squares)
const objects = [];
const COLORS = [0xffff00, 0x0000ff]; // Yellow and Blue
let spawnRate = 30; // Frames between spawns
let fallSpeed = 0.1;

// Game variables
let isPaused = false;
let score = 0;
let lives = 3;
let frames = 0;
let gameRunning = false;
const currentDifficultyDisplay = document.getElementById('current-difficulty');

// Movement variables
let velocity = 0;
let maxSpeed = 0.1; // Controls the gliding speed
let friction = 0.95; // Gradually slows down movement

// Color transition variables
let targetColor = new THREE.Color(0xffff00); // Initial color
let colorTransitionSpeed = 0.1; // Increase speed for seamless transitions

// Track active keys
const keys = {}; 

window.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

window.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// Handle UI
const pauseButton = document.getElementById('pause-btn');
const restartButton = document.getElementById('restart-btn');
const difficultySelect = document.getElementById('difficulty');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');

// Pause and resume functionality
pauseButton.addEventListener('click', () => {
  isPaused = !isPaused; // Toggle pause state
  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});

// Restart functionality
restartButton.addEventListener('click', () => {
  score = 0;
  lives = 3;
  objects.forEach(obj => scene.remove(obj));
  objects.length = 0;
  isPaused = false;
  pauseButton.textContent = "Pause";
  updateUI();
});

// Welcome Screen Logic
function startGame(difficulty) {
  // Set difficulty parameters
  if (difficulty === 'easy') [fallSpeed, spawnRate] = [0.1, 50];
  else if (difficulty === 'medium') [fallSpeed, spawnRate] = [0.15, 30];
  else if (difficulty === 'hard') [fallSpeed, spawnRate] = [0.2, 15];

  // Update the difficulty display
  currentDifficultyDisplay.textContent = `Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`;

  // Reset game variables
  score = 0;
  lives = 3;
  objects.forEach(obj => scene.remove(obj)); // Clear falling objects
  objects.length = 0;

  // Reset circle position and velocity
  circle.position.x = 0;
  velocity = 0;

  // Show the game UI and canvas
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('ui').style.display = 'block';
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.style.display = 'block';

  // Restart the game loop
  isPaused = false;
  gameRunning = true;
  animate();
}

// Create a new falling object (2D square)
function createObject() {
  const squareGeometry = new THREE.PlaneGeometry(0.5, 0.5); // Adjust size if needed
  const squareMaterial = new THREE.MeshBasicMaterial({ color: COLORS[Math.floor(Math.random() * COLORS.length)] });
  const square = new THREE.Mesh(squareGeometry, squareMaterial);

  // Ensure objects spawn fully inside the game area
  const halfGameAreaWidth = gameAreaWidth / 2;
  const objectHalfWidth = 0.25; // Half the width of the square (0.5 / 2)

  const xPosition = Math.random() * (halfGameAreaWidth - objectHalfWidth - (-halfGameAreaWidth + objectHalfWidth)) + 
                    (-halfGameAreaWidth + objectHalfWidth);

  square.position.set(xPosition, gameAreaHeight / 2, 0); // Random x position within boundaries
  scene.add(square);
  objects.push(square);
}

// Update falling objects
function updateFallingObjects() {
  objects.forEach((obj, index) => {
    obj.position.y -= fallSpeed; // Move downward
    if (obj.position.y < -gameAreaHeight / 2) {
      objects.splice(index, 1); // Remove if it goes off-screen
      scene.remove(obj);
    }

    // Collision detection
    const distance = obj.position.distanceTo(circle.position);
    if (distance < 1) {
      if (obj.material.color.equals(circle.material.color)) {
        score++; // Correct match
      } else {
        lives--; // Incorrect match
      }
      objects.splice(index, 1);
      scene.remove(obj);
    }
  });
}

// Update circle movement and boundaries
function updateCirclePosition() {
  if (keys['ArrowLeft']) velocity = -maxSpeed; // Move left
  else if (keys['ArrowRight']) velocity = maxSpeed; // Move right
  else velocity *= friction; // Gradual stop when no key is pressed

  circle.position.x += velocity;

  // Restrict the circle's movement to the game area boundaries
  const halfGameAreaWidth = gameAreaWidth / 2;
  const sphereRadius = 0.5;

  if (circle.position.x < -halfGameAreaWidth + sphereRadius) {
    circle.position.x = -halfGameAreaWidth + sphereRadius;
    velocity = 0; // Stop at the boundary
  }
  if (circle.position.x > halfGameAreaWidth - sphereRadius) {
    circle.position.x = halfGameAreaWidth - sphereRadius;
    velocity = 0; // Stop at the boundary
  }
}

// Update circle color (smooth transition)
function updateCircleColor() {
  circle.material.color.lerp(targetColor, colorTransitionSpeed); // Interpolate towards target color
}

// Update UI
function updateUI() {
  scoreDisplay.innerHTML = `<strong>Score:</strong> ${score}`;
  livesDisplay.innerHTML = `<strong>Lives:</strong> ${"❤️".repeat(lives)} ${"🖤".repeat(3 - lives)}`;
}

function restartGame() {
  // Hide the Game Over screen
  document.getElementById('game-over-screen').style.display = 'none';

  // Show the Welcome screen
  document.getElementById('welcome-screen').style.display = 'flex';

  // Hide the Game UI and Canvas
  document.getElementById('ui').style.display = 'none';
  const canvas = document.querySelector('canvas');
  if (canvas) canvas.style.display = 'none';

  // Reset game variables
  score = 0;
  lives = 3;
  objects.forEach(obj => scene.remove(obj)); // Remove all falling objects
  objects.length = 0;

  // Stop the game loop
  isPaused = true;
}

// Main animation loop
function animate() {
  if (!gameRunning) return; // Stop the animation loop if the game is not running

  if (!isPaused) {
    frames++;
    if (frames % spawnRate === 0) createObject();
    updateFallingObjects();
    updateCirclePosition();
    updateCircleColor();
    updateUI();
  }

  if (lives <= 0 && !isPaused) {
    document.getElementById('game-over-screen').style.display = 'flex';
    document.getElementById('final-score').textContent = score;
    isPaused = true;
    gameRunning = false; // Stop the animation loop
  }

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}


//animate();
