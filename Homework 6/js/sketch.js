let lemons = [];
let numLemons = 6;

// pigeon animation frames
let pigeonFrames = [];
let frameIndex = 0;
let frameSpeed = 6;

// pigeon position
let birdX = 300;
let birdY = 200;
let moveSpeed = 2;

function preload() {
    for (let i = 1; i <=22; i++) {
        pigeonFrames.push(loadImage("images/pigeon_" + i + ".png"));
    }
}

function setup() {
    createCanvas(700, 500);

    // 6 lemon objects
    for (let i = 0; i < numLemons; i ++) {
        let x = random(60, width - 60);
        let y = random(100, height - 60);
        let s = random(60, 90);

        // different colors of yellow
        let c = color(random(230, 255), random(200, 240), random(0,70));

        lemons.push(new Lemon(x, y, s, c, i));
    }
}

function draw() {
    background (196, 241, 255);

    for (let i = 0 ; i < lemons.length; i++) {
        lemons[i].display();
    }

    let moving = false;

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

    birdX = constrain(birdX, 0, width);
    birdY = constrain(birdY, 0, height);

    let currentSpeed;
    if (moving) {
        currentSpeed = 8;
    }
    else {
        currentSpeed = 10;
    }

    if (frameCount % currentSpeed === 0) {
        frameIndex = (frameIndex + 1) % pigeonFrames.length;
    }

    imageMode(CENTER);
    image(pigeonFrames[frameIndex], birdX, birdY, 160, 160);

    fill(0);
    textSize(14);
    text ("Move the pigeon with WASD", 10, 20)
    
}
