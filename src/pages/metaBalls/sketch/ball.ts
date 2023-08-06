import P5 from 'p5';

export class Ball {
  private p5: P5;

  public pos: P5.Vector;

  public vel: P5.Vector;

  public radius: number;

  constructor(p5: P5, scale: number) {
    this.p5 = p5;
    this.radius = p5.random(60, 120);
    this.pos = p5.createVector(
      p5.random(this.radius + scale, p5.width - this.radius - scale),
      p5.random(this.radius + scale, p5.height - this.radius - scale)
    );
    this.vel = P5.Vector.random2D().mult(p5.random(2, 5));
  }

  checkEdges() {
    if (
      this.pos.x - this.radius < 0 ||
      this.pos.x + this.radius > this.p5.width
    ) {
      this.vel.x *= -1;
    }
    if (
      this.pos.y - this.radius <= 0 ||
      this.pos.y + this.radius >= this.p5.height
    ) {
      this.vel.y *= -1;
    }
  }

  update() {
    this.checkEdges();
    this.pos.add(this.vel);
  }

  show(darkMode: boolean) {
    this.p5.fill(darkMode ? 250 : 30, 30);
    this.p5.stroke(darkMode ? 250 : 30);
    const diameter = this.radius * 2;
    this.p5.ellipse(this.pos.x, this.pos.y, diameter, diameter);
  }
}

export default Ball;
