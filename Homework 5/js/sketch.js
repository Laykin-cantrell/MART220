var numberOfLemons = 8;
var lemonX = [];
var lemonY = [];
var lemonSize = [];
var lemonImg;

function preload() {
    lemonImg = loadImg("images/lemon.png");
}

function setup() {
    createCanvas(600, 400);

    for (var i = 0; i < numberOfLemons; i++) {
        lemonX[i] = random(60, width - 60);
        lemonY[i] = random(100, height - 80);
        lemonSize[i] = random(60, 85);
     }
}

function draw() {
    background(196, 241, 255);

    for (var i = 0; i < numberOfLemons; i++) {
        var animatedY = lemonY[i] + sin(frameCount * 0.05 + i) * 12;

        imageMode(Center);
        image(lemonImg, lemonX[i], animatedY, lemonSize[i], lemonSize[i]);
    }
}
