import P5 from 'p5';

class Flow {
  private p5: P5;

  public vec: P5.Vector;

  constructor(p5: P5) {
    this.p5 = p5;
    this.vec = p5.createVector(0, 0);
  }

  update(xoff: number, yoff: number, zoff: number) {
    const noiseAngle = this.p5.noise(xoff, yoff, zoff) * this.p5.TWO_PI;
    this.vec = P5.Vector.fromAngle(noiseAngle).setMag(50);
  }

  show(scale: number, x: number, y: number) {
    this.p5.push();
    this.p5.translate(x * scale, y * scale);
    this.p5.rotate(this.vec.heading());
    // this.p5.stroke(0);
    // this.p5.strokeWeight(1);
    this.p5.line(0, 0, scale, 0);
    this.p5.pop();
  }
}

export default Flow;
