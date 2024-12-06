# ColorMatch_v2_webGL

A browser-based interactive 2D game built using Three.js and WebGL, where players control a circle to catch falling objects of the same color while avoiding obstacles and collecting power-ups. With vibrant visuals and engaging mechanics, this game is both fun and challenging!

## **Live Demo**
Play the game here: https://colormatch.fun/

## **Features**
- Smooth 2D circle movement with gliding effects.
- Seamless transitions between **four colors**: Red, Blue, Yellow, and Green.
- Dynamic difficulty adjustment: Easy, Medium, and Hard.
- Unique **power-ups** to add variety to gameplay.
- Score and Lives UI displayed in the top-right corner.
- Pause, Resume, and Restart functionality.

## **Gameplay Instructions**
### **Objective:**
- Catch falling objects that match the circle's current color to gain points.
- Avoid objects of a different color to preserve lives.
- Be wary of power-ups that can both help and hinder your progress.

### **Controls:**
- **Arrow Left:** Move the circle left.
- **Arrow Right:** Move the circle right.
- **Spacebar:** Change the circle's color (Red, Blue, Yellow, Green in sequence).

### **Game Rules:**
- Gain points by catching objects of the same color as the circle.
- Lose a life if you catch an object of a different color.
- The game ends when you lose all lives or collect a bomb power-up.

### **Difficulty Levels:**
- **Easy:** Slower falling speed and fewer objects.
- **Medium:** Moderate falling speed and spawn rate.
- **Hard:** Faster falling speed and more frequent object spawns.

## **Power-Ups**
Power-ups are represented by actual objects in the game and have unique effects:

### 1. **Bomb** (Bomb Icon)
- **Effect:** Instant game over when collected.
- **Strategy:** Avoid at all costs to keep playing!

### 2. **Stopwatch** (Stopwatch Icon)
- **Effect:** Temporarily slows down the falling objects, making them easier to catch.
- **Duration:** The slowdown effect lasts for a fixed period (e.g., 300 frames).
- **Strategy:** Use during difficult levels to catch your breath.

### 3. **Snowflake** (Snowflake Icon)
- **Effect:** Cancels the effect of the stopwatch, restoring normal speed to the game.
- **Strategy:** Collect only if the slow-motion effect is no longer beneficial.

## **Technologies Used**
- **[Three.js](https://threejs.org/):** A JavaScript library for creating 3D and 2D graphics in the browser using WebGL.
- **HTML5:** To structure the game interface.
- **CSS3:** To style the game UI (e.g., buttons, score display).
- **JavaScript:** For game logic, controls, and rendering.
- **Apache:** Used as the web server for hosting the game.
- **[Let's Encrypt](https://letsencrypt.org/):** For generating a free SSL certificate to secure the website.
- **Azure:** The cloud platform used to host the website.

## **Setup and Installation**

1. **Download the Project Files**:
   - Clone or download the repository.

2. **Run a Local Server (Optional)**:
   - If you want to run the game locally, you can use the following:
     - Using Python:
       ```bash
       python -m http.server
       ```
     - Or use any local server like XAMPP, WAMP, or Live Server for VS Code.

3. **Play the Game**:
   - **Online**:
     - Visit [https://colormatch.fun](https://colormatch.fun) to play the game directly in your browser.
   - **Locally**:
     - Open your browser and navigate to `http://localhost:8000` (or the port displayed in your terminal if running locally).

## **Project Structure**
```
ColorMatch/
├── index.html          # Main HTML file for the game
├── README.md           # Contains the README 
├── requirements.txt    # Contains the requirements
├── script.js           # Contains game logic using Three.js
├── style.css           # CSS styles for the UI
└── assets/             # (Optional) Directory for additional assets (e.g., images, sounds)
```

## **Requirements**
   - A modern web browser with WebGL support (e.g., Chrome, Firefox, Edge, Safari).
   - For online play:
     - A stable internet connection.
     - Visit [https://colormatch.fun](https://colormatch.fun) in your browser.
   - For local testing:
     - A local server for testing (e.g., Python HTTP server, XAMPP, or Live Server for VS Code).
     - Python 3.x (for running a local server).
    
## **Slides**
https://docs.google.com/presentation/d/1TurJFRMy9nIAsRhqCgNDHUOWxlTW5XmatDp59L113UY/edit?usp=sharing

