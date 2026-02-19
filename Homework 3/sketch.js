// Stars twinkle when the SPACE BAR is held
// Click the moon for it to move back and forth

let stars = [];
let numStars = 120;

let moonX = 480;
let moonY = 80;
let moonR = 40;
let moonMoves = false;
let moonDir = 1;
let moonSpeed = 2;
let moonLeftLimit = 100;
let moonRightLimit = 640;

function setup()  {
  createCanvas(700, 600);

  //Create stars (random positions)
  for (let i = 0; i <numStars; i++) {
    stars.push({
      x: random(width),
      y: random(0, 220),
      baseSize: random(1, 4),
      phase: random(TWO_PI)
    });
  }
}

function draw() {
  // Sky
  background(20, 30, 70);

  // Title (upper-left)
  noStroke();
  fill(255);
  textSize(18);
  text("Starry Night", 10, 24);

  // Stars
  for (let i = 0; i < stars.length; i++)  {
    let s = stars[i];
    let starSize = s.baseSize;

    // Only twinkle while the spacebar is being held 
    if (keyIsDown(32)) {  // 32 = spacebar
      starSize = s.baseSize + 2 * sin(frameCount * 0.2 + s.phase);
    }
    fill (255);
    ellipse(s.x, s.y, starSize, starSize);
  }

  // Moon (click to move)
  fill(240, 240, 200);
  ellipse(moonX, moonY, moonR * 2, moonR * 2);

  // moon moves back and forth when clicked on
  if (moonMoves)  {
    moonX += moonSpeed * moonDir;

    // if/else bouncing between limits
    if (moonX > moonRightLimit)  {
      moonX = moonRightLimit;
      moonDir = -1;
    } else if (moonX < moonLeftLimit)  {
      moonX = moonLeftLimit;
      moonDir = 1;
    }
  }

  // Mountains
    fill(60, 80, 120);
    triangle(0, 300, 150, 140, 300, 300);
    triangle(200, 300, 360, 170, 520, 300);
    triangle(100, 300, 260, 180, 420, 300);
    triangle(320, 300, 500, 150, 700, 300);

  // Ground 
    fill(30, 100, 50);
    rect(0, 300, width, 300);

  // Name (lower-right)
  fill(255);
  textSize(16);
  text("Laykin Cantrell", width - 120, height - 12);

  // Helper text
  textSize(16);
  text("Hold SPACEBAR for stars to TWINKLE | Click on the moon for it to move", 10, height - 12);
}

// Click moon to move (event handling + condition)
function mousePressed()  {
  let d = dist(mouseX, mouseY, moonX, moonY);
  if (d < moonR) {
    moonMoves = !moonMoves;
  }
}

