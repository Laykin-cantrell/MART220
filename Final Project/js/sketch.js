let pigeon;
let pigeonPaths = [];

let bossPigeon;
let bossPigeonPaths = [];
let bossHealth = 20;

let lemonImg;
let orangeImg;

let lemons = [];
let oranges = [];
let obstacles = [];

let particles = [];
let playerBullets = [];
let bossBullets = [];

let bossShootTimer = 0;

let score = 0;
let health = 100;
let gameState = "playing";

let timer = 60;
let startTime;
let timeLeft;

let damageCooldown = 0;

let moveSpeed = 5;

// sounds
let music;
let goodSound;
let badSound;

function preload() {
    for (let i = 1; i <= 22; i++) {
        pigeonPaths.push("images/good_pigeon/pigeon_" + i + ".png");
    }

    for (let i = 1; i <= 22; i++) {
        bossPigeonPaths.push("images/bad_pigeon/pigeon_" + i + ".png");
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
    new Canvas(1200, 800);

    startTime = millis();

    
    // player sprite
    pigeon = new Sprite(width / 2, height / 2, 80, 80);

    pigeon.addAni("fly", ...pigeonPaths);
    pigeon.changeAni("fly");

    pigeon.scale = 0.6;

    // stop spinning
    pigeon.rotationLock = true;
    pigeon.rotation = 0;
    pigeon.rotationSpeed = 0;

    // boss pigeon
    bossPigeon = new Sprite(width / 2, 120, 120, 120);

    bossPigeon.addAni("fly", ...bossPigeonPaths);
    bossPigeon.changeAni("fly");

    bossPigeon.scale = 0.8;
    bossPigeon.collider = "none";
    bossPigeon.vel.x = 2;

    bossPigeon.rotationLock = true;
    bossPigeon.rotation = 0;
    bossPigeon.rotationSpeed = 0;

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

    // oranges = bad items / enemies
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

        orange.health = 3;

        orange.vel.x = random(-2, 2);
        orange.vel.y = random(-2, 2);

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
        width / 3,
        height / 3,
        100,
        60
    );

    pinkObstacle.color = "pink";
    pinkObstacle.collider = "static";
    pinkObstacle.rotationlock = true;
    obstacles.push(pinkObstacle);

    // purple obstacle player cannot pass through
    let purpleObstacle = new Sprite(
        width - 250,
        height - 220,
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
        timeLeft = max(0, timer - floor((millis() - startTime) / 1000));
    }

    if (gameState === "playing") {

        if (damageCooldown > 0) {
            damageCooldown--;
        }

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

        // boss pigeon moves side to side
        bossPigeon.y = 120;
        bossPigeon.rotation = 0;

        if (bossPigeon.x < 100) {
            bossPigeon.x = 100;
            bossPigeon.vel.x *= -1;
        }

        if (bossPigeon.x > width - 100) {
            bossPigeon.x = width - 100;
            bossPigeon.vel.x *= -1;
        }

        // boss shoots projectiles
        bossShootTimer--;

        if (bossShootTimer <= 0) {
            shootBossBullet();
            bossShootTimer = 90;
        }

        // obstacle collision
        for (let i = 0; i < obstacles.length; i++) {
            pigeon.collides(obstacles[i]);
        }

        // lemons 
        for (let i = 0; i < lemons.length; i++) {
            if (pigeon.overlaps(lemons[i])) {
                score++;
                if (!goodSound.isPlaying()) {
                    goodSound.play();
                }

                // relocate lemon
                lemons[i].x = random(80, width - 80);
                lemons[i].y = random(100, height - 80);
            }
        }


        // moving oranges hurt player
        for (let i = 0; i < oranges.length; i++) {
            moveOrangeRandomly(oranges[i]);

            if (pigeon.overlaps(oranges[i]) && damageCooldown <= 0) {
                health -=10;
                
                if (!badSound.isPlaying()) {
                    badSound.play();
                }

                damageCooldown = 30;
            }
        }


        // update player bullets
        for (let i = playerBullets.length - 1; i >= 0; i--) {
            let bullet = playerBullets[i];

            // remove bullet if it leaves the screen
            if (bullet.y < -20) {
                bullet.remove();
                playerBullets.splice(i, 1);
                continue;
            }

            // player bullet hits obstacle
            let playerBulletHitObstacle = false;

            for (let k = 0; k < obstacles.length; k++) {
                if (bullet.overlaps(obstacles[k])) {
                    bullet.remove();
                    playerBullets.splice(i, 1);
                    playerBulletHitObstacle = true;
                    break;
                }
            }

            if (playerBulletHitObstacle) {
                continue;
            }

            // bullet hits boss
            if (bullet.overlaps(bossPigeon)) {
                bossHealth--;

                createParticles(bossPigeon.x, bossPigeon.y);

                bullet.remove();
                playerBullets.splice(i, 1);

                if (bossHealth <= 0) {
                    gameState = "win";

                    bossPigeon.remove();
                    pigeon.vel.x = 0;
                    pigeon.vel.y = 0;
                }

                continue;
            }

            // bullet hit orange
            for (let j = oranges.length - 1; j >= 0; j--) {
                if (bullet.overlaps(oranges[j])) {
                    oranges[j].health--;

                    createParticles(oranges[j].x, oranges[j].y);

                    bullet.remove();
                    playerBullets.splice(i, 1);

                    if (oranges[j].health <= 0) {
                        oranges[j].remove();
                        oranges.splice(j, 1);
                        score += 2;
                    }

                    break; 
                }
            }
        }

        // update boss bullets
        for (let i = bossBullets.length - 1; i >= 0; i--) {
            let bullet = bossBullets[i];

            // remove bullet if it leaves the screen
            if (bullet.x < -20 || bullet.x > width + 20 || bullet.y < -20 || bullet.y > height + 20) {
                bullet.remove();
                bossBullets.splice(i, 1);
                continue;
            }

            // boss bullet htis obstacle
            let bossBulletHitObstacle = false;

            for (let k = 0; k < obstacles.length; k++) {
                if (bullet.overlaps(obstacles[k])) {
                    bullet.remove();
                    bossBullets.splice(i, 1);
                    bossBulletHitObstacle = true;
                    break;
                }
            }

            if (bossBulletHitObstacle) {
                continue;
            }

            // boss bullet hits player
            if (bullet.overlaps(pigeon)) {
                health -= 5;
                badSound.play();

                createParticles(pigeon.x, pigeon.y);

                bullet.remove();
                bossBullets.splice(i, 1);
            }
        }

        // attack oranges
        if (kb.presses("x")) {

            for (let i = oranges.length - 1; i >= 0; i--) {

                if (dist(
                    pigeon.x,
                    pigeon.y,
                    oranges[i].x,
                    oranges[i].y
                ) < 80) {

                    oranges[i].health--;

                    badSound.play();

                    // particles
                    createParticles(
                        oranges[i].x,
                        oranges[i].y
                    );

                    // destory oranges
                    if (oranges[i].health <= 0) {

                        oranges[i].remove();
                        oranges.splice(i, 1);
                    }
                }
            }
        }

        // particles
        for (let i = particles.length - 1; i >= 0; i --) {

            particles[i].update();
            particles[i].show();

            if (particles[i].finished()) {
                particles.splice(i, 1);
            }
        }

        // win condition
        if (bossHealth <= 0) {

            gameState = "win";
            stopGameMovement();
        }

        // lose condition
        if (health <=0) {

            gameState = "lose";
            stopGameMovement();
        }
        
        // timer lose condition
        if (timeLeft <= 0) {

            gameState = "lose";
            stopGameMovement();
        }
    }

    // text
    fill (0);

    textSize(20);
    textAlign(LEFT);

    text("Score: " + score, 20, 30);
    text("Health: " + health, 20, 60);
    text("Boss Health: " + bossHealth, 20, 90);
    text("Time: " + timeLeft, 20, 120);
    text("Move with WASD", 20, 150);
    text("Press SPACE to shoot", 20, 180);

    // win screen
    if (gameState === "win") {

        textAlign(CENTER, CENTER);

        textSize(50);
        text("YOU WIN!", width / 2, height / 2);

        textSize(24);
        text("All Oranges are Destroyed!", width / 2, height / 2 + 55);
    }

    // lose screen
    if (gameState === "lose") {

        textAlign(CENTER, CENTER);

        textSize(50);
        text("GAME OVER", width / 2, height / 2);

        textSize(24);
        text("You ran out of health or time.", width / 2, height / 2 + 55);
    }
}

// particle function
function createParticles(x, y) {

    for (let i = 0; i < 8; i++) {

        let p = new Particles(x, y);
        particles.push(p);
    }
}

// orange movement function
function moveOrangeRandomly(orange) {
    
    // randomly change positions
    if (random(1) < 0.02) {
        orange.vel.x = random(-4, 4);
        orange.vel.y = random(-4, 4);
    }

    // keep oranges from being too slow
    if (abs(orange.vel.x) < 1) {
        orange.vel.x = random([-3, 3]);
    }

    if (abs(orange.vel.y) < 2) {
        orange.vel.y = random([-3, 3]);
    }

    // bounce off walls
    if (orange.x < 40 || orange.x > width - 40) {
        orange.vel.x *= -1;
    }

    if (orange.y < 40 || orange.y > height - 40) {
        orange.vel.y *= -1;
    }

    // keep orange on screen
    orange.x = constrain(orange.x, 40, width - 40);
    orange.y = constrain(orange.y, 40, height - 40);
}

// particle class
class Particles {

    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.vx = random(-2, 2);
        this.vy = random(-2, 2);

        this.alpha = 255;
    }

    finished() {
        return this.alpha < 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        this.alpha -= 5;
    }

    show() {
        noStroke();
        fill(255, 120, 0, this.alpha);
        ellipse(this.x, this.y, 16);
    }
}

function shootBossBullet() {
    let bullet = new Sprite(bossPigeon.x, bossPigeon.y + 50, 14, 14);

    bullet.color = "red";
    bullet.collider = "none";

    // aim towards player
    let dx = pigeon.x - bossPigeon.x;
    let dy = pigeon.y - bossPigeon.y;
    let distance = sqrt(dx * dx + dy * dy);

    bullet.vel.x = (dx / distance) * 5;
    bullet.vel.y = (dy / distance) * 5;

    bossBullets.push(bullet);
}

function stopGameMovement() {
    pigeon.vel.x = 0;
    pigeon.vel.y = 0;

    if (bossPigeon) {
        bossPigeon.vel.x = 0;
        bossPigeon.vel.y = 0;
    }

    for (let i = 0; i < oranges.length; i++) {
        oranges[i].vel.x = 0;
        oranges[i].vel.y = 0;
    }

    for (let i = playerBullets.length - 1; i >= 0; i--) {
        playerBullets[i].remove();
        playerBullets.splice(i, 1);
    }

    for (let i = bossBullets.length - 1; i >= 0; i--) {
        bossBullets[i].remove();
        bossBullets.splice(i, 1);
    }
}

function keyPressed() {
    if (gameState === "playing" && keyCode === 32) {
        shootPlayerBullet();
    }
}

function shootPlayerBullet() {
    let bullet = new Sprite(pigeon.x, pigeon.y - 40, 12, 12);

    bullet.color = "yellow";
    bullet.collider = "none";
    bullet.vel.y = -10;

    playerBullets.push(bullet);
}

// start background music after click
function mousePressed() {

    userStartAudio();

    if (music && !music.isPlaying()) {
        if (!music.isPlaying()) {
        music.setVolume(0.3);
        music.loop();
        console.log("music started");
    
         }
    }
}
