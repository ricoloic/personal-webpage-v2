import Boid from '../boid';

class Point {
  public x: number;

  public y: number;

  public userData: Boid;

  constructor(x: number, y: number, userData = null) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
}

export default Point;
