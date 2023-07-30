import P5 from 'p5';
import Flow from './flow';

class Particle {
  private p5: P5;

  private pos: P5.Vector;

  private prevPos: P5.Vector;

  private vel: P5.Vector;

  private acc: P5.Vector;

  private limitVel: number;

  constructor(p5: P5, x = p5.random(p5.width), y = p5.random(p5.height)) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    this.prevPos = this.pos.copy();
    this.vel = p5.createVector(p5.random(-1, 1), p5.random(-1, 1));
    this.acc = p5.createVector(0, 0);
    this.limitVel = 2;
  }

  reset() {
    this.pos.set(this.p5.random(this.p5.width), this.p5.random(this.p5.height));
    this.prevPos = this.pos.copy();
  }

  update() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
    this.vel.add(this.acc);
    this.vel.limit(this.limitVel);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force: P5.Vector) {
    this.acc.add(force);
  }

  show(color: [number, number, number, number] = [26, 51, 43, 0.1]) {
    this.wrapAround();
    // this.p5.strokeWeight(8)
    this.p5.stroke(...color);
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  wrapAround() {
    if (this.pos.x > this.p5.width) {
      this.pos.x = 0;
      this.updatePrev();
    } else if (this.pos.x < 0) {
      this.pos.x = this.p5.width;
      this.updatePrev();
    }

    if (this.pos.y > this.p5.height) {
      this.pos.y = 0;
      this.updatePrev();
    } else if (this.pos.y < 0) {
      this.pos.y = this.p5.height;
      this.updatePrev();
    }
  }

  follow(scale: number, columns: number, flowField: Flow[]) {
    const x = this.p5.floor(this.pos.x / scale);
    const y = this.p5.floor(this.pos.y / scale);
    const index = x + y * columns;
    const force = flowField[index].vec;
    this.applyForce(force);
  }
}

export default Particle;
