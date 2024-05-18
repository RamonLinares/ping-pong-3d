Skip to content
Navigation Menu
RamonLinares
/
ping-pong-3d

Type / to search

Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Files
Go to file
t
img
js
main.js
paddle_ball.js
powerups_obstacles.js
utils.js
sounds
LICENSE
index.html
Editing main.js in ping-pong-3d
Breadcrumbsping-pong-3d/js
/
main.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

4
Line wrap mode

No wrap
Editing main.js file contents
44
NextPreviousAllMatch CaseRegexpBy Word
Replace
ReplaceReplace All×
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
const { Scene, PerspectiveCamera, WebGLRenderer, AmbientLight, PointLight, SpotLight, Vector3, Clock, BufferGeometry, LineBasicMaterial, Line, ShadowMaterial, AudioListener, Audio, AudioLoader, PlaneGeometry, MeshStandardMaterial, Mesh, BoxGeometry, SphereGeometry } = THREE;

const BALL_INITIAL_VELOCITY = new Vector3(1, 6.0, 3.0); // Initial velocity towards the player with an angle
const GRAVITY = new Vector3(0, -9.8, 0); // Realistic gravity
const PADDLE_MOVE_SPEED = 0.1; // Reduced paddle move speed for better control
const WALL_BOUNDARY = 2.5;
const TABLE_BOUNDARY = 5;
const TABLE_HEIGHT = 0.2;
const NET_HEIGHT = 0.5; // Increased net height
const MIN_BOUNCE_VELOCITY = 1.5; // Minimum velocity for the bounce
const VELOCITY_INCREMENT_MIN = 1.1; // Minimum velocity increment
const VELOCITY_INCREMENT_MAX = 1.3; // Maximum velocity increment
const HEIGHT_INCREMENT_MIN = 1.0; // Minimum height increment
const HEIGHT_INCREMENT_MAX = 1.5; // Maximum height increment
const MAX_HEIGHT_VELOCITY = 5; // Maximum height velocity
const ANGLE_ADJUSTMENT_FACTOR = 2; // Adjusted factor for better gameplay
const MAX_BALL_SPEED = 15; // Maximum speed for the ball
const MAX_BALL_HEIGHT = 4; // Maximum height for the ball
const SPIN_EFFECT_FACTOR = 0.5; // Spin effect factor

// Paddle boundaries
const PADDLE_BOUNDARY_Z_MIN = 2; // Player paddle cannot move closer than 2 units from the net
const PADDLE_BOUNDARY_Z_MAX = TABLE_BOUNDARY + 1; // Allow the paddle to move slightly beyond the table edge
const COMPUTER_PADDLE_BOUNDARY_Z_MIN = -TABLE_BOUNDARY - 1; // Allow the computer paddle to move slightly beyond the table edge
const COMPUTER_PADDLE_BOUNDARY_Z_MAX = -4; // Computer paddle should stay further back from the net

class PingPongGame {
    constructor() {
        this.clock = new Clock();
        this.isGameStarted = false; // Flag to control game start
        this.powerUps = [];
        this.obstacles = [];
        this.isAnimating = true; // Start the animation initially
        this.isPaused = false; // Flag to control pause state
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;

        this.init();
        window.addEventListener('resize', () => this.onWindowResize());
        window.addEventListener('wheel', (event) => this.onMouseWheel(event));
        document.addEventListener('mousedown', (event) => this.onMouseDown(event));
        document.addEventListener('mousemove', (event) => this.onMouseMove(event));
        document.addEventListener('mouseup', (event) => this.onMouseUp(event));
        document.addEventListener('keydown', (event) => this.onKeyDown(event));
        document.getElementById('startButton').addEventListener('click', () => this.startGame()); // Add click event for 'Start' button
        document.getElementById('restartButton').addEventListener('click', () => this.startGame()); // Add click event for 'Restart' button
        document.getElementById('pauseButton').addEventListener('click', () => this.togglePause()); // Add click event for 'Pause' button
        document.addEventListener('touchstart', (event) => this.onTouchStart(event));
        document.addEventListener('touchmove', (event) => this.onTouchMove(event));
        document.addEventListener('touchend', (event) => this.onTouchEnd(event));
        
        this.animate();
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        document.getElementById('pauseButton').innerText = this.isPaused ? 'Resume' : 'Pause';
        if (!this.isPaused) {
            this.animate();
        }
    }

    startGame() {
        const startScreen = document.getElementById('startScreen');
        const gameOverScreen = document.getElementById('gameOverScreen');
        console.log(`startScreen: ${startScreen}, gameOverScreen: ${gameOverScreen}`);

        // Resume AudioContext after user gesture
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }

        if (startScreen.style.display === 'block' || gameOverScreen.style.display === 'block') {
            this.isGameStarted = true; // Set game as started
            this.hideStartScreen();
            this.hideGameOverScreen();
            this.resetGame();
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
Editing ping-pong-3d/js/main.js at main · RamonLinares/ping-pong-3d 
