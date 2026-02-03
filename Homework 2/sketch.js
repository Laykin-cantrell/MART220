function setup()
{
    createCanvas(800,600);
}

function draw ()
{
  background(20, 30, 70);

    // Moon
    noStroke();
    fill(240, 240, 200);
    ellipse(480, 80, 80, 80);

    // Stars
    fill(255);
    ellipse(100, 60, 4, 4);
    ellipse(200, 40, 3, 3);
    ellipse(300, 70, 5, 5);
    ellipse(400, 40, 4, 4);
    ellipse(520, 40, 3, 3);
    ellipse(60, 120, 4, 4);
    ellipse(570, 100, 5, 6);
    ellipse(630, 40, 5, 6);

    // Mountains
    fill(60, 80, 120);
    triangle(0, 300, 150, 140, 300, 300);
    triangle(200, 300, 360, 170, 520, 300);
    triangle(100, 300, 260, 180, 420, 300);
    triangle(320,300, 500, 150, 700, 300);
    
    // Ground
    fill(30, 100, 50);
    rect(0, 300, width, 300);
}

    

