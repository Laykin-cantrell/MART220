let beignetsImg;
let pastaImg;
let strawberriesImg;
let aiImg;
let theFont;

let aiX = 450
let aiY = 300

let beignetsX = 100;
let beignetsY = 200;

let pastaX = 100;
let pastaY = 360;

let strawberriesX = 100;
let strawberriesY = 500;

let timeLeft = 20;
let timerInterval;
let moveInterval;
let chaseInterval;

function preload() {
    aiImg = loadImage ("images/ai.png");
    beignetsImg = loadImage ("images/beignets.png");
    pastaImg = loadImage ("images/pasta.png");
    strawberriesImg = loadImage ("images/strawberries.png");
    theFont = loadFont ("assets/Mogra-Regular.tff");
}

function setup() {
    createCanvas (900, 600);
    moveInterval = setInterval(randomMoveAI, 2500);
    chaseInterval = setInterval(chaseAI, 120);
    timerInterval = setInterval(timer, 1000);
}

function draw() {
    background (255, 216, 216);

    // Title + name
    fill (10, 14, 17);
    textFont (theFont);
    textSize(28);
    text ("Favorite Food Chase", 30, 60);

    fill (10, 14, 17);
    textSize (18);
    text ("Laykin Cantrell", 32, 92);

    // Timer Text
    textSize (22);
    fill(255);
    text ("Time Left: " + timeLeft, 30, 130);

    // ai target
    image (aiImg, aiX, aiY, 200, 140);
    // chasers
    image (beignetsImg, beignetsX, beignetsY, 220, 150);
    image (pastaImg, pastaX, pastaY, 220, 150);
    image (strawberriesImg, strawberriesX, strawberriesY, 220, 150);

    if (timeLeft <=0) {
        fill(0);
        textSize(55);
        text ("Game Over!!!", width / 2 - 170, height / 2);
    }
}

    function randomMoveAI() {
        aiX = random(0, width - 200);
        aiY = random(150, height - 140);
    }
    function chaseAI() {
        if (timeLeft <=0) return;

        let chaseSpeed = 0.10;
        beignetsX = lerp(beignetsX, aiX, chaseSpeed);
        beignetsY = lerp(beignetsY, aiY, chaseSpeed);

        pastaX = lerp(pastaX, aiX, chaseSpeed);
        pastaY = lerp(pastaY, aiY, chaseSpeed);

        strawberriesX = lerp(strawberriesX, aiX, chaseSpeed);
        strawberriesY = lerp(strawberriesY, aiY, chaseSpeed);
    }
    // countdown timer
    function timer() {
        timeLeft -= 1;
        if (timeLeft <=0) {
            clearInterval(timerInterval);
            clearInterval(moveInterval);
            clearInterval(chaseInterval);
            noLoop();
        }
    }


