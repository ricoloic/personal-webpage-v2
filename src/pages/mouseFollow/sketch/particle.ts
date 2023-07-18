import P5 from 'p5';
import { ColorObj } from '../../../constants/colorPalettes';

export class Particle {
  public color: ColorObj;

  private p5: P5;

  public pos: P5.Vector;

  private readonly vel: P5.Vector;

  private lifespan: number;

  constructor(p5: P5, center: { x: number; y: number }, color: ColorObj) {
    this.p5 = p5;
    this.color = color;
    this.pos = p5.createVector(p5.mouseX - center.x, p5.mouseY - center.y);
    this.vel = p5.createVector(p5.random(-1, 1), p5.random(1, -1));
    this.lifespan = 255;
  }

  finished() {
    return this.lifespan < 0;
  }

  update() {
    this.pos.add(this.vel);
    this.lifespan -= this.p5.random(10, 15);
  }

  show(border = false, alfa = false) {
    const alfaValue = alfa ? this.lifespan : 255;
    if (border) this.p5.stroke(255, alfaValue);
    else this.p5.noStroke();
    this.p5.fill(
      this.p5.color(
        this.color.rgba.r,
        this.color.rgba.g,
        this.color.rgba.b,
        alfaValue
      )
    );
    this.p5.ellipse(this.pos.x, this.pos.y, 16);
  }
}

export default Particle;
