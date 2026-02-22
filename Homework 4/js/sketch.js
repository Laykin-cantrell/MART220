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

let beignetsOffsetX = -180, beignetsOffsetY = -60;
let pastaOffsetX = 180, pastaOffsetY = -20;
let strawberriesOffsetX = 0, strawberriesOffsetY = 170;

let timeLeft = 20;
let timerInterval;
let moveInterval;
let chaseInterval;

function preload() {
    aiImg = loadImage ("images/ai.png");
    beignetsImg = loadImage ("images/beignets.png");
    pastaImg = loadImage ("images/pasta.png");
    strawberriesImg = loadImage ("images/strawberries.png");
    theFont = loadFont ("assets/Gveret_Levin/GveretLevin-Regular.ttf");
}

function setup() {
    createCanvas (1100, 900);
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
    fill(10, 14, 17);
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
        
        let beignetsTargetX = aiX + beignetsOffsetX;
        let beignetsTargetY = aiY + beignetsOffsetY;

        let pastaTargetX = aiX + pastaOffsetX;
        let pastaTargeY = aiY + pastaOffsetY;

        let strawberriesTargetX = aiX + strawberriesOffsetX;
        let strawberriesTargetY = aiY + strawberriesOffsetY;

        beignetsX = lerp(beignetsX, beignetsTargetX, chaseSpeed);
        beignetsY = lerp(beignetsY, beignetsTargetY, chaseSpeed);

        pastaX = lerp(pastaX, pastaTargetX, chaseSpeed);
        pastaY = lerp(pastaY, pastaTargeY, chaseSpeed);

        strawberriesX = lerp(strawberriesX, strawberriesTargetX, chaseSpeed);
        strawberriesY = lerp(strawberriesY, strawberriesTargetY, chaseSpeed);
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


