import P5 from 'p5';

export default class Handle {
  public p5: P5;

  static barLength = 150;

  static movingSpeed = 6;

  public pos: P5.Vector;

  public scale: number;

  public side: 'left' | 'right';

  public isMoving: boolean;

  public movingDirection: null | 'up' | 'down';

  constructor(p5: P5, side: 'left' | 'right', scale: number) {
    this.p5 = p5;
    this.scale = scale;
    this.pos = new P5.Vector();
    this.side = side;
    this.isMoving = false;
    this.movingDirection = null;
  }

  create() {
    if (this.side === 'left') {
      this.pos.set(30, this.p5.height / 2);
    } else if (this.side === 'right') {
      this.pos.set(this.p5.width - 30, this.p5.height / 2);
    }
  }

  move() {
    if (this.isMoving) {
      if (this.movingDirection === 'up') {
        if (this.pos.y - Handle.barLength / 2 <= 0) return;
        this.pos.y -= Handle.movingSpeed;
      } else if (this.movingDirection === 'down') {
        if (this.pos.y + Handle.barLength / 2 >= this.p5.height) return;
        this.pos.y += Handle.movingSpeed;
      }
    }
  }

  startMoving(direction: 'up' | 'down') {
    this.isMoving = true;
    this.movingDirection = direction;
  }

  stopMoving(direction: 'up' | 'down') {
    if (direction === this.movingDirection) {
      this.isMoving = false;
      this.movingDirection = null;
    }
  }

  show() {
    this.p5.rect(this.pos.x, this.pos.y, this.scale, Handle.barLength);
  }
}
