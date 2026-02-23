var numberOfLemons = 10;
var lemonX = [];
var lemonY = [];
var lemonSize = [];
var lemonImg;

function preload() {
    lemonImg = loadImage("images/lemon.png");
}

function setup() {
    createCanvas(700, 500);

    for (var i = 0; i < numberOfLemons; i++) {
        lemonX[i] = random(60, width - 70);
        lemonY[i] = random(100, height - 70);
        lemonSize[i] = random(60, 85);
     }
}

function draw() {
    background(196, 241, 255);

    for (var i = 0; i < numberOfLemons; i++) {
        var animatedY = lemonY[i] + sin(frameCount * 0.05 + i) * 12;

        imageMode(CENTER);
        image(lemonImg, lemonX[i], animatedY, lemonSize[i], lemonSize[i]);
    }
}
