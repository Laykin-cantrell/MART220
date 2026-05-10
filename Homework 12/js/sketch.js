let titleTexture;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // texture for title and name
    titleTexture = createGraphics(500, 120);
    titleTexture.background(255, 230);
    titleTexture.fill(80, 50, 20);
    titleTexture.textAlign(CENTER, CENTER);
    titleTexture.textSize(30);
    titleTexture.text("Floating 3D Fruit Bowl", 250, 40);
    titleTexture.textSize(18);
    titleTexture.text("By Laykin Cantrell", 250, 80);
}

function draw() {
    background(210, 230, 240);

    // lights
    ambientLight(120);
    directionalLight(255, 255, 255, 0.5, 1, -1);
    pointLight(255, 220, 150, 0, -200, 200);

    // move around with mouse
    orbitControl();

    // title sign
    push();
    translate(0, -260, 0);
    rotateY(frameCount * 0.005);
    texture(titleTexture);
    plane(350, 90);
    pop();

    // table
    push();
    translate(0, 170, 0);
    rotateY(frameCount * 0.01);
    ambientMaterial(120, 80, 45);
    cylinder(80, 120);
    pop();

    // bowl rim
    push();
    translate(0, 60, 0);
    rotateX(PI / 2);
    rotateZ(frameCount * 0.01);
    specularMaterial(180, 120, 80);
    torus(120, 20);
    pop();

    // bowl base
    push();
    translate(0, 90, 0);
    rotateY(frameCount * 0.01);
    ambientMaterial(150, 90, 50);
    cylinder(100, 40);
    pop();

    // orange
    push();
    translate(-90, -20, 40);
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.03);
    ambientMaterial(255, 130, 20);
    sphere(45);
    pop();

    // lemon 1
    push();
    translate(70, -30, 30);
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.02);
    ambientMaterial(255, 230, 40);
    ellipsoid(60, 35, 35),
    pop();

    // lemon 2
    push();
    translate(0, -60, -60);
    rotateX(frameCount * 0.025);
    rotateZ(frameCount * 0.02);
    specularMaterial(245, 220, 50);
    ellipsoid(55, 30, 35);
    pop();

    // green leaf
    push();
    translate(-40, -100, 0);
    rotateX(frameCount * 0.02);
    rotateY(frameCount * 0.04);
    ambientMaterial(50, 160, 70);
    ellipsoid(20, 50, 10);
    pop();

    // cone stem
    push();
    translate(35, -105, 10);
    rotateX(frameCount * 0.03);
    rotateZ(frameCount * 0.02);
    ambientMaterial(80, 50, 25);
    cone(15, 60);
    pop();

    // small rotating box
    push();
    translate(-160, 70, -80);
    rotateX(frameCount * 0.03);
    rotateY(frameCount * 0.04);
    ambientMaterial(100, 150, 220);
    box(45);
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}