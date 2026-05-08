let pigeon;
let pigeonPaths = [];

let lemonImg;
let orangeImg;

let lemons = [];
let oranges = [];
let obstacles = [];

let score = 0;
let health = 100;
let gameState = "playing";

let moveSpeed = 5;

// sounds
let music;
let goodSound;
let badSound;

function preload() {
    for (let i = 1; i <= 22; i++) {
        pigeonPaths.push("images/pigeon/pigeon_" + i + ".png");
    }

    // images
    lemonImg = loadImage("images/lemon/lemon.png");
    orangeImg = loadImage("images/orange/orange.png");

    // sounds
    music = loadSound("sounds/background_music.wav");
    goodSound = loadSound("sounds/good_sound.mp3");
    badSound = loadSound("sounds/bad_sound.wav");
}

function setup() {
    new Canvas(900, 600);

    // sound volume
    music.setVolume(0.2);
    goodSound.setVolume(0.8);
    badSound.setVolume(1);

    // player sprite
    pigeon = new Sprite(450, 300, 80, 80);

    pigeon.addAni("fly", ...pigeonPaths);
    pigeon.changeAni("fly");

    pigeon.scale = 0.5;

    // stop spinning
    pigeon.rotationLock = true;
    pigeon.rotation = 0;
    pigeon.rotationSpeed = 0;

    // lemons = collectible items
    for (let i = 0; i < 6; i++) {
        let lemon = new Sprite(
            random(80, width - 80),
            random(100, height - 80),
            40,
            40
        );

        lemon.img = lemonImg;
        lemon.scale = 0.1;
        lemon.collider = "none";
        lemons.push(lemon);
    }

    // oranges = bad items
    for (let i = 0; i < 4; i++) {
        let orange = new Sprite(
            random(80, width - 80),
            random(100, height - 80),
            40,
            40
        );

        orange.img = orangeImg;
        orange.scale = 0.1;
        orange.collider = "none";
        oranges.push(orange);
    }

    // grey obstacle spawns randomly at start
    let greyObstacle = new Sprite(
        random(100, width - 100),
        random(120, height - 100),
        100,
        60
    );

    greyObstacle.color = "grey";
    greyObstacle.collider = "static";
    greyObstacle.rotationlock = true;
    obstacles.push(greyObstacle);

    // pink obstacle remains stationary
    let pinkObstacle = new Sprite(
        300,
        200,
        100,
        60
    );

    pinkObstacle.color = "pink";
    pinkObstacle.collider = "static";
    pinkObstacle.rotationlock = true;
    obstacles.push(pinkObstacle);

    // purple obstacle player cannot pass through
    let purpleObstacle = new Sprite(
        650,
        380,
        100,
        60
    );

    purpleObstacle.color = "purple";
    purpleObstacle.collider = "static";
    purpleObstacle. rotationlock = true;
    obstacles.push(purpleObstacle);
}

function draw() {
    background(196, 241, 255);

    if (gameState === "playing") {

        pigeon.vel.x = 0;
        pigeon.vel.y = 0;

        // keep pigeon from spinning
        pigeon.rotation = 0;
        pigeon.rotationSpeed = 0;

        // wasd movement
        if (kb.pressing("a")) {
            pigeon.vel.x = -moveSpeed;
        }

        if (kb.pressing("d")) {
            pigeon.vel.x = moveSpeed;
        }

        if (kb.pressing("w")) {
            pigeon.vel.y = -moveSpeed;
        }

        if (kb.pressing("s")) {
            pigeon.vel.y = moveSpeed;
        }

        // keep pigeon on screen
        pigeon.x = constrain(pigeon.x, 40, width - 40);
        pigeon.y = constrain(pigeon.y, 40, height - 40);

        // obstacle collision
        for (let i = 0; i < obstacles.length; i++) {
            pigeon.collides(obstacles[i]);
        }

        // lemons 
        for (let i = 0; i < lemons.length; i++) {
            if (pigeon.overlaps(lemons[i])) {
                score++;
                goodSound.play();

                // relocate lemon
                lemons[i].x = random(80, width - 80);
                lemons[i].y = random(100, height - 80);
            }
        }

        // oranges
        for (let i = 0; i < oranges.length; i++) {
            if (pigeon.overlaps(oranges[i])) {
                health -= 10;
                badSound.play();

                // relocate orange
                oranges[i].x = random(80, width - 80);
                oranges[i].y = random(100, height - 80);
            }
        }

        // win codition
        if (score >= 10) {
            gameState = "win";

            pigeon.vel.x = 0;
            pigeon.vel.y = 0;
        }

        // lose codition
        if (health <= 0) {
            gameState = "lose";

            pigeon.vel.x = 0;
            pigeon.vel.y = 0;
        }
    }

    // text
    fill(0);

    textSize(20);
    textAlign(LEFT);

    text("Score: " + score, 20, 30);
    text("Health: " +health, 20, 60);
    text("Move with WASD", 20, 90);

    // win screen
    if (gameState === "win") {
        textAlign(CENTER, CENTER);

        textSize(50);
        text("YOU WIN!", width / 2, height / 2);

        textSize(24);
        text("You collected 10 lemons!", width / 2, height / 2 + 55);
    }

    // lose screen
    if (gameState === "lose") {
        textAlign(CENTER, CENTER);

        textSize(50);
        text("GAME OVER", width / 2, height / 2);

        textSize(24);
        text("Your health reached 0.", width / 2, height / 2 + 55);
    }
}

// start background music after click
function mousePressed() {
    console.log("mouse clicked");

    userStartAudio();

    if (music) {
        console.log("music exists");

        if (!music.isPlaying()) {
            music.setLoop(true);
            music.play();
            console.log("music should be playing");
        }
    } else {
        console.log("music is missing");
    }
}