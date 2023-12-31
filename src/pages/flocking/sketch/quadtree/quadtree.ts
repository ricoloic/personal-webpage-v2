import P5 from 'p5';
import Point from './point';
import Rectangle from './rectangle';

class QuadTree {
  private readonly boundary: Rectangle;

  private readonly capacity: number;

  private readonly points: Point[];

  private divided: boolean;

  // eslint-disable-next-line no-use-before-define
  private northeast: QuadTree | null;

  // eslint-disable-next-line no-use-before-define
  private northwest: QuadTree | null;

  // eslint-disable-next-line no-use-before-define
  private southeast: QuadTree | null;

  // eslint-disable-next-line no-use-before-define
  private southwest: QuadTree | null;

  constructor(boundary: Rectangle = new Rectangle(0, 0, 0, 0), capacity = 4) {
    // Rectangle class
    this.boundary = boundary;

    // the max number of points in a section
    this.capacity = capacity;

    // list of points in the quad
    this.points = [];

    // if the quad as been divided into other quads
    this.divided = false;

    this.northeast = null;
    this.northwest = null;
    this.southeast = null;
    this.southwest = null;
  }

  // divide the quad into 4 region like quad
  // northeast, northwest, southeast, southwest
  subdivide() {
    const b = this.boundary;

    this.northeast = new QuadTree(b.subdivide('ne'), this.capacity);
    this.northwest = new QuadTree(b.subdivide('nw'), this.capacity);
    this.southeast = new QuadTree(b.subdivide('se'), this.capacity);
    this.southwest = new QuadTree(b.subdivide('sw'), this.capacity);

    this.divided = true;
  }

  // adds a point like object to the quad
  // or if the quad is at max capacity divide it
  // and insert it in the corresponding region
  // point = point.x && point.y
  // eslint-disable-next-line consistent-return
  insert(point: Point) {
    if (!this.boundary.contains(point)) return false;

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    if (!this.divided) this.subdivide();

    if (this.northeast?.insert(point)) return true;
    if (this.northwest?.insert(point)) return true;
    if (this.southeast?.insert(point)) return true;
    if (this.southwest?.insert(point)) return true;
  }

  // query the points like object in a given range and returns them
  query(range: Rectangle, found: Point[] = []) {
    if (!this.boundary.intersects(range)) return found;
    for (let i = 0; i < this.points.length; i += 1)
      if (range.contains(this.points[i])) found.push(this.points[i]);

    if (this.divided) {
      this.northeast?.query(range, found);
      this.northwest?.query(range, found);
      this.southwest?.query(range, found);
      this.southeast?.query(range, found);
    }

    return found;
  }

  // use p5js to draw the QuadTree and its points
  show(p5: P5, darkMode: boolean) {
    p5.stroke(darkMode ? 250 : 30);
    p5.strokeWeight(1);
    p5.noFill();
    p5.rect(
      this.boundary.x - this.boundary.w,
      this.boundary.y - this.boundary.h,
      this.boundary.w * 2,
      this.boundary.h * 2
    );
    if (this.divided) {
      this.northeast?.show(p5, darkMode);
      this.northwest?.show(p5, darkMode);
      this.southeast?.show(p5, darkMode);
      this.southwest?.show(p5, darkMode);
    }
    for (let i = 0; i < this.points.length; i += 1) {
      p5.point(this.points[i].x, this.points[i].y);
    }
  }
}

export default QuadTree;
