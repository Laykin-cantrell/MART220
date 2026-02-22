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

let timeLeft = 15;
let timerInterval;

function preload() {
    aiImg = loadImage ("images/ai.png");
    beignetsImg = loadImage ("images/beignets.png");
    pastaImg = loadImage ("images/pasta.png");
    strawberriesImg = loadImage ("")
    theFont = loadFont ("assets/Mogra-Regular.tff");
}

function setup() {
    createCanvas (900, 700);
    moveInterval = setInterval(randomMoveAI, 2500);
    chaseInterval = setInterval(chaseAI, 120);
    timerInterval = setInterval(timer, 1000);
}

function draw() {
    background(20,30,24);
}
