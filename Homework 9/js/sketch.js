let pigeon;
let pigeonFrames = [];

let lemonImg;
let orangeImg;
let buildingImg;
let treeImg;
let cloudImg;

let lemons = [];
let oranges = [];
let buildings = [];
let trees = [];
let clouds = [];

// sounds
let music;
let goodSound;
let badSound;

let score = 0;
let health = 100;
let gameState = "playing";

let moveSpeed = 5;
let frameIndex = 0;

function preload() {
    for (let i = 1; i <= 22; i++) {
        pigeonFrames.push(loadImage("images/pigeon/pigeon_" + i + ".png"));
    }

    lemonImg = loadImage("images/lemon/lemon.png");
    orangeImg = loadImage("images/orange/orange.png");
    buildingImg = loadImage("images/obstacles/building.png");
    treeImg = loadImage("images/obstacles/tree.png");
    cloudImg = loadImage("images/obstacles/cloud.png");

    // sound
    music = loadSound("sounds/background_music.wav");
    goodSound = loadSound("sounds/good_sound.mp3");
    badSound = loadSound("sounds/bad_sound.wav");
}

function setup() {
    new Canvas(1200, 700);

    // sound settings
    music.setVolume(0.2);
    goodSound.setVolume(0.8);
    badSound.setVolume(1);

    // clouds
    for (let i = 0; i < 3; i++) {
        let cloud = new Sprite(random(width), random(40, 130));
        cloud.img = cloudImg;
        cloud.scale = random(0.3, 0.5);
        cloud.vel.x = random(0.5, 1.2);
        cloud.collidar = "none";
        cloud.layer = 0;
        clouds.push(cloud);
    }

    // player
    pigeon = new Sprite(350, 250, 80, 80);
    pigeon.img = pigeonFrames[0];
    pigeon.scale = 0.7;
    pigeon.layer = 2;

    // lemons
    for (let i = 0; i < 6; i++) {
        let lemon = new Sprite(random(60, width - 60), random(100, height - 60));
        lemon.img = lemonImg;
        lemon.scale = 0.18;
        lemons.push(lemon);
    }

    // oranges
    for (let i = 0; i < 4; i++) {
        let orange = new Sprite(random(60, width - 60), random(100, height - 60));
        orange.img = orangeImg;
        orange.scale = 0.13;
        oranges.push(orange);
    }

    // buildings
    let b1 = new Sprite(180, 200, 120, 120);
    b1.img = buildingImg;
    b1.scale = 0.4;
    b1.collidar = "static";
    buildings.push(b1);

    let b2 = new Sprite(520, 320, 120, 120);
    b1.img = buildingImg;
    b1.scale = 0.4;
    b1.collidar = "static";
    buildings.push(b2);

    // trees
    for (let i = 0; i < 3; i++) {
        let tree = new Sprite(random(80, width - 80), random(100, height - 80));
        tree.img = treeImg;
        tree.scale = 0.3;
        tree.collidar = "none";
        trees.push(tree);
    }
}

function draw() {
    background(196, 241, 255);

    // cloud loop
    for (let cloud of clouds) {
        if (cloud.x > width + 50) {
            cloud.x = -50;
            cloud.y = random(40,130);
        }
    }

    if (gameState === "playing") {

        pigeon.vel.x = 0;
        pigeon.vel.y = 0;

        if (kb.pressing("a")) pigeon.vel.x = -moveSpeed;
        if (kb.pressing("d")) pigeon.vel.x = moveSpeed;
        if (kb.pressing("w")) pigeon.vel.y = -moveSpeed;
        if (kb.pressing("s")) pigeon.vel.y = moveSpeed;

        // animation
        if (frameCount % 6 === 0) {
            frameIndex = (frameIndex + 1) % pigeonFrames.length;
            pigeon.img = pigeonFrames[frameIndex];
        }

        pigeon.x = constrain(pigeon.x, 40, width - 40);
        pigeon.y = constrain(pigeon.y, 40, height - 40);

        // building collision 
        for (let b of buildings) {
            pigeon.collides(b);
        }

        // lemon collision 
        for (let lemon of lemons) {
            if (pigeon.overlaps(lemon)) {
                score++;
                goodSound.play();

                lemon.x = random(60, width - 60);
                lemon.y = random(100, height - 60);
            }
        }

        // orange collision
        for (let orange of oranges) {
            if (pigeon.overlaps(orange)) {
                health -= 10;
                badSound.play();

                orange.x = random(60, width - 60);
                orange.y = random(100, height - 60);
            }
        }

        // win / lose
        if (score >= 10) gameState = "win";
        if (health <= 0) gameState = "lose";
    }

    fill(0);
    textSize(18);
    text("Score: " + score, 20, 30);
    text("Health: " + health, 20, 55);
    text("WASD to move", 20, 80);

    if (gameState === "win") {
        textAlign(CENTER, CENTER);
        textSize(48);
        text("YOU WIN!", width / 2, height / 2);
    }

    if (gameState === "lose") {
        textAlign(CENTER, CENTER);
        textSize(48);
        text("GAME OVER", width / 2, height / 2);
    }
}

// sound 
function mousePressed() {
    userStartAudio();

    if (!music.isPlaying()) {
        music.setLoop(true);
        music.play();
    }
}