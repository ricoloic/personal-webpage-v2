import Point from './point';
import Rectangle from './rectangle';

class Circle {
  private readonly x: number;

  private readonly y: number;

  private readonly r: number;

  private readonly rSquared: number;

  constructor(x: number, y: number, r: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point: Point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    const d = (point.x - this.x) ** 2 + (point.y - this.y) ** 2;
    return d <= this.rSquared;
  }

  intersects(range: Rectangle) {
    const xDist = Math.abs(range.x - this.x);
    const yDist = Math.abs(range.y - this.y);

    // radius of the circle
    const { r } = this;

    const w = range.w / 2;
    const h = range.h / 2;

    const edges = (xDist - w) ** 2 + (yDist - h) ** 2;

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}

export default Circle;
