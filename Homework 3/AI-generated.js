let moonX = 500;
let moonSpeed = 0.5;

let starBrightness = 0;
let starFade = 2;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // Sky
  noStroke();
  fill(20, 20, 50);
  rect(0, 0, width, height);

  // ⭐ Stars (twinkling)
  stroke(starBrightness);
  for (let i = 0; i < 100; i++) {
    point(random(width), random(height));
  }

  // change star brightness
  starBrightness += starFade;

  if (starBrightness > 255 || starBrightness < 100) {
    starFade *= -1; // reverse direction
  }

  // 🌙 Moon (moving)
  noStroke();
  fill(230, 230, 200);
  circle(moonX, 80, 60);

  moonX -= moonSpeed;

  // reset moon when off screen
  if (moonX < -30) {
    moonX = width + 30;
  }

  // Back mountains
  fill(40, 40, 70);
  triangle(50, 300, 200, 150, 350, 300);
  triangle(250, 300, 400, 140, 550, 300);

  // Front mountains
  fill(20, 20, 40);
  triangle(0, 350, 150, 200, 300, 350);
  triangle(200, 350, 350, 220, 500, 350);

  // Ground
  fill(10, 10, 30);
  rect(0, 350, width, 50);
}