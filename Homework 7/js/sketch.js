let lemons = [];
let numLemons = 6;

// pigeon animation frames
let pigeonFrames = [];
let frameIndex = 0;

// pigeon position
let birdX = 300;
let birdY = 200;
let moveSpeed = 2;

// food image
let lemonImg;

// score and timer
let score = 0;
let gameState = "playing";
let totalTime = 60; 
let startTime = 0;

function preload() {
    // pigeon frames
    for (let i = 1; i <=22; i++) {
        pigeonFrames.push(loadImage("images/pigeon_" + i + ".png"));
    }

    // lemon image
    lemonImg = loadImage("images/lemon.png");
}

function setup() {
    createCanvas(700, 500);
    for (let i = 0; i < numLemons; i++) {
        let x = random(60, width - 60);
        let y = random(100, height - 60);
        let s = random(60, 90);

        lemons.push(new Lemon(x, y, s));
    }

    startTime = millis();
}

function draw() {
    background(196, 241, 255);

    // timer
    let elapsedSeconds = floor((millis() - startTime) / 1000);
    let timeLeft = max(0, totalTime - elapsedSeconds);

    if (timeLeft === 0) {
        gameState = "gameOver";
    }

    // display lemons
    for (let i = 0; i < lemons.length; i++) {
        lemons[i].display();
    }

    // pigeon animation
    let moving = false;

    if (gameState === "playing") {
        if (keyIsDown(65)) { // A
        birdX -= moveSpeed;
        moving = true;
        }
        if (keyIsDown(68)) { // D
        birdX += moveSpeed;
        moving = true;
        }
        if (keyIsDown(87)) { // W
        birdY -= moveSpeed;
        moving = true;
        }
        if (keyIsDown(83)) { // S
        birdY += moveSpeed;
        moving = true;
        }
    }

    birdX = constrain(birdX, 0, width);
    birdY = constrain(birdY, 0, height);

    // speed
    let currentSpeed;
    if (moving) {
        currentSpeed = 10;
    } 
    else {
        currentSpeed = 14;
    }

    if (frameCount % currentSpeed === 0) {
        frameIndex = (frameIndex + 1) % pigeonFrames.length;
    }

    imageMode(CENTER);
    image(pigeonFrames[frameIndex], birdX, birdY, 160, 160);

    // score
    if (gameState === "playing") {
        for (let i = 0; i < lemons.length; i++) {
            let d = dist(birdX, birdY, lemons[i].x, lemons[i].y);

            if (d < 60) {
                score++;

                lemons[i].x = random(60, width - 60);
                lemons[i].y = random(100, height - 60);
            }
        }
    }

    // text
    fill(0);
    textSize(16);
    text("Score: " + score, 10, 25);
    text("Time: " + timeLeft, width - 110, 25);

    textSize(14);
    text("Move the pigeon with WASD", 10, 50);

    // game over screen
    if (gameState === "gameOver") {
        textAlign(CENTER, CENTER);
        textSize(48);
        fill(0);
        text("GAME OVER", width / 2, height / 2);

        textSize(24);
        text("Final Score: " + score, width / 2, height / 2 + 60);

        textAlign(LEFT, BASELINE);
    }
}

// lemon
class Lemon {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.setNextMove();
    }

    setNextMove() {
        this.nextMoveFrame = frameCount + floor(random(60, 180));
    }

    
    respawn() {
        this.x = random(60, width - 60);
        this.y = random(100, height - 60);
        this.setNextMove();
    }

    display() {
        imageMode(CENTER);
        image(lemonImg, this.x, this.y, this.s, this.s);
    }
}