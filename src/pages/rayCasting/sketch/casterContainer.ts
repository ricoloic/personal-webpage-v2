import P5 from 'p5';
import Caster from './caster';
import LineBoundary from './lineBoundary';

const SHADOW_DIST = 25;
const SHADOW_AMOUNT = 5;

class CasterContainer {
  private p5: P5;

  public caster: Caster;

  public shadows: Caster[];

  constructor(p5: P5, initialPosition: P5.Vector, backgroundColor = 250) {
    this.p5 = p5;
    this.caster = new Caster(p5, initialPosition, backgroundColor);
    this.shadows = [];
    for (let i = 0; i < SHADOW_AMOUNT; i += 1)
      this.shadows.push(
        new Caster(p5, new P5.Vector(initialPosition.x, initialPosition.y))
      );
  }

  castRays(lines: LineBoundary[]) {
    this.caster.castRays(lines);
  }

  castBackground(lines: LineBoundary[], color: number, displayShadow: boolean) {
    this.caster.castBackground(lines, color);
    if (displayShadow) {
      for (let i = 0; i < this.shadows.length; i += 1) {
        this.shadows[i].castBackground(lines, color, true);
      }

      this.caster.castPoint();
      for (let i = 0; i < this.shadows.length; i += 1) {
        this.shadows[i].castPoint();
      }
    }
  }

  setPosition(x: number, y: number) {
    this.caster.setPosition(x, y);
    for (let i = 0; i < this.shadows.length; i += 1) {
      const a = this.p5.map(i, 0, this.shadows.length, 0, this.p5.TWO_PI);
      this.shadows[i].setPosition(
        x + this.p5.sin(a) * SHADOW_DIST,
        y + this.p5.cos(a) * SHADOW_DIST
      );
    }
  }
}

export default CasterContainer;
