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

    // Mountains
    fill(60, 80, 120);
    triangle(0, 300, 150, 150, 300, 300);
    triangle(200, 300, 350, 170, 500, 300);
    triangle(300, 300, 520, 190, 700, 300);

    // Ground
    fill(30, 100, 50);
    rect(0, 300, width, 100);
}

    

