import P5 from 'p5';
import LineBoundary from './lineBoundary';
import Point from './point';

class BoxBoundary {
  private lineBoundary1: LineBoundary;

  private lineBoundary2: LineBoundary;

  private lineBoundary3: LineBoundary;

  private lineBoundary4: LineBoundary;

  public color: number;

  public thickness: number;

  constructor(
    p5: P5,
    pt1: Point,
    pt2: Point,
    pt3: Point,
    pt4: Point,
    color = 250,
    thickness = 2
  ) {
    this.lineBoundary1 = new LineBoundary(p5, pt1, pt2);
    this.lineBoundary2 = new LineBoundary(p5, pt2, pt3);
    this.lineBoundary3 = new LineBoundary(p5, pt3, pt4);
    this.lineBoundary4 = new LineBoundary(p5, pt4, pt1);
    this.color = color;
    this.thickness = thickness;
  }

  show(editing: boolean) {
    this.lineBoundary1.show(editing, this.color, this.thickness);
    this.lineBoundary2.show(editing, this.color, this.thickness);
    this.lineBoundary3.show(editing, this.color, this.thickness);
    this.lineBoundary4.show(editing, this.color, this.thickness);
  }

  getLines() {
    const lines: LineBoundary[] = [];
    lines.push(this.lineBoundary1);
    lines.push(this.lineBoundary2);
    lines.push(this.lineBoundary3);
    lines.push(this.lineBoundary4);
    return lines;
  }

  getPoints() {
    const points: Point[] = [];
    points.push(this.lineBoundary1.pt1);
    points.push(this.lineBoundary1.pt2);
    points.push(this.lineBoundary2.pt1);
    points.push(this.lineBoundary2.pt2);
    points.push(this.lineBoundary3.pt1);
    points.push(this.lineBoundary3.pt2);
    points.push(this.lineBoundary4.pt1);
    points.push(this.lineBoundary4.pt2);
    return points;
  }
}

export default BoxBoundary;
