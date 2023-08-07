import P5 from 'p5';
import LineBoundary from './lineBoundary';

class Ray {
  public angle: number;

  private origin: P5.Vector;

  private direction: P5.Vector;

  constructor(origin: P5.Vector, angle: number) {
    this.angle = angle;
    this.origin = origin;
    this.direction = P5.Vector.fromAngle(angle);
  }

  cast(line: LineBoundary) {
    const t = Ray.calculateT(
      line.pt1.x,
      line.pt1.y,
      line.pt2.x,
      line.pt2.y,
      this.origin.x,
      this.origin.y,
      this.origin.x + this.direction.x,
      this.origin.y + this.direction.y
    );

    const u = Ray.calculateU(
      line.pt1.x,
      line.pt1.y,
      line.pt2.x,
      line.pt2.y,
      this.origin.x,
      this.origin.y,
      this.origin.x + this.direction.x,
      this.origin.y + this.direction.y
    );

    const intersectBoundary = t > 0 && t < 1 && u > 0;

    if (intersectBoundary) {
      return Ray.calculateIntersection(
        line.pt1.x,
        line.pt1.y,
        line.pt2.x,
        line.pt2.y,
        t
      );
    }
    return null;
  }

  private static calculateIntersection(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    t: number
  ) {
    const x = x1 + t * (x2 - x1);
    const y = y1 + t * (y2 - y1);
    return new P5.Vector(x, y);
  }

  private static calculateU(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return -1;
    }
    const numerator = (x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2);
    return numerator / denominator;
  }

  private static calculateT(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denominator === 0) {
      return -1;
    }
    const numerator = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
    return numerator / denominator;
  }
}

export default Ray;
