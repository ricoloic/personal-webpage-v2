import P5 from 'p5';
import { ColorObj } from '../../../constants/colorPalettes';

class Confetti {
  private p5: P5;

  private pos: P5.Vector;

  private readonly vel: P5.Vector;

  private readonly radius: number;

  private readonly color: ColorObj;

  private readonly maxLife: number;

  public life: number;

  private fill: boolean;

  constructor(
    p5: P5,
    x: number,
    y: number,
    colors: ColorObj[],
    magnitude: number,
    fill = false,
    radius = 40,
    life = p5.floor(p5.random(40, 95))
  ) {
    this.p5 = p5;
    this.pos = p5.createVector(x, y);
    this.vel = p5
      .createVector(p5.random(-1, 1), p5.random(-1, 1))
      .setMag(magnitude);
    this.fill = fill;
    this.radius = radius;
    this.color = p5.random(colors);
    this.maxLife = life;
    this.life = life;
  }

  updateLife() {
    this.life -= 1;
  }

  updatePos() {
    this.pos.add(this.vel);
  }

  show() {
    const r = this.p5.map(this.life, 0, this.maxLife, 0, this.radius);

    if (this.fill) {
      this.p5.noStroke();
      this.p5.fill(this.color.color);
    } else {
      this.p5.noFill();
      this.p5.stroke(this.color.color);
      this.p5.strokeWeight(2);
    }
    this.p5.circle(this.pos.x, this.pos.y, r * 2);
  }

  animate() {
    this.updateLife();
    this.updatePos();
    this.show();
  }
}

export default Confetti;
