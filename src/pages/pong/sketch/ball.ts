import P5 from 'p5';
import Handle from './handle';

export default class Ball {
  public p5: P5;

  public scale: number;

  public pos: P5.Vector;

  public acc: P5.Vector;

  public vel: P5.Vector;

  constructor(p5: P5, scale: number) {
    this.p5 = p5;
    this.scale = scale;
    this.pos = new P5.Vector();
    this.vel = new P5.Vector();
    this.acc = new P5.Vector();
  }

  create(side?: 'left' | 'right' | undefined) {
    this.pos.set(this.p5.width / 2, this.p5.height / 2);
    let velX = this.p5.random([1, -1]);
    if (side === 'left') velX = -1;
    else if (side === 'right') velX = 1;
    this.vel.set(velX, this.p5.random(-0.5, 0.5)).setMag(7);
  }

  intersectHandles(leftHandle: Handle, rightHandle: Handle) {
    if (
      this.pos.x - this.scale <= leftHandle.pos.x &&
      this.pos.x >= leftHandle.pos.x - this.scale
    ) {
      if (
        this.pos.y >= leftHandle.pos.y - Handle.barLength / 2 &&
        this.pos.y <= leftHandle.pos.y + Handle.barLength / 2
      ) {
        this.vel.x *= -1;
        const angle = this.pos.y - leftHandle.pos.y;
        this.vel.y = angle / 9;
      }
    }

    if (
      this.pos.x + this.scale >= rightHandle.pos.x &&
      this.pos.x <= rightHandle.pos.x + this.scale
    ) {
      if (
        this.pos.y >= rightHandle.pos.y - Handle.barLength / 2 &&
        this.pos.y <= rightHandle.pos.y + Handle.barLength / 2
      ) {
        this.vel.x *= -1;
        const angle = this.pos.y - rightHandle.pos.y;
        this.vel.y = angle / 9;
      }
    }
  }

  checkEdges() {
    // top
    if (this.pos.y - this.scale / 2 <= 0) {
      this.vel.y *= -1;
    }

    // bottom
    if (this.pos.y + this.scale / 2 >= this.p5.height) {
      this.vel.y *= -1;
    }
  }

  outOfBound() {
    if (this.pos.x - this.scale / 2 <= 0) {
      return 'left';
    }

    if (this.pos.x + this.scale / 2 >= this.p5.width) {
      return 'right';
    }

    return undefined;
  }

  update() {
    this.checkEdges();
    this.pos.add(this.vel);
  }

  show() {
    this.p5.rect(this.pos.x, this.pos.y, this.scale, this.scale);
  }
}
