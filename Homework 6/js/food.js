class Lemon {
    constructor(x, y, s, bodyCol, floatOffset) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.bodyCol = bodyCol;
        this.floatOffset = floatOffset;
    }

    display() {
        // floating animation for lemons 
        let floatY = this.y + sin(frameCount * 0.05 + this.floatOffset) * 10;

        noStroke(); 

        // lemon body
        fill(this.bodyCol);
        ellipse(this.x, floatY, this.s, this.s * 0.65);

        fill(255, 255, 210, 180);
        ellipse(
            this.x - this.s * 0.18,
            floatY - this.s * 0.12,
            this.s * 0.22,
            this.s * 0.16,
        );

        fill(40, 160, 70);
        ellipse(
            this.x,
            floatY - this.s * 0.42,
            this.s * 0.28,
            this.s * 0.16,
        );
    }
}
