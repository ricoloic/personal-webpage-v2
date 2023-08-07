import P5 from 'p5';
import Point from './point';

class LineBoundary {
  private p5: P5;

  public pt1: Point;

  public pt2: Point;

  private thickness: number;

  private color: number;

  constructor(p5: P5, pt1: Point, pt2: Point, color = 250, thickness = 2) {
    this.p5 = p5;
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.color = color;
    this.thickness = thickness;
  }

  show(
    editing: boolean,
    color: number = this.color,
    thickness: number = this.thickness
  ) {
    this.p5.strokeWeight(thickness);
    this.p5.stroke(color);
    this.p5.line(this.pt1.x, this.pt1.y, this.pt2.x, this.pt2.y);
    if (editing) {
      this.pt1.show();
      this.pt2.show();
    }
  }

  getLines() {
    const lines: LineBoundary[] = [];
    lines.push(this);
    return lines;
  }

  getPoints() {
    const points: Point[] = [];
    points.push(this.pt1);
    points.push(this.pt2);
    return points;
  }
}

export default LineBoundary;
