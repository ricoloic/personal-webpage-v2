import P5 from 'p5';
import LineBoundary from './lineBoundary';
import Point from './point';

class Boundary {
  private p5: P5;

  public pointAmount = 2;

  public thickness = 2;

  public color = 250;

  public offset = 0;

  public points: Point[];

  public lines: LineBoundary[];

  constructor(p5: P5, pointAmount: number | Point[] | P5.Vector = 2) {
    this.p5 = p5;
    this.points = [];
    this.lines = [];

    if (typeof pointAmount === 'number') {
      this.pointAmount = pointAmount;

      const smallest = p5.min(p5.width, p5.height);
      const radius = smallest / 5;
      const centerX = p5.width / 2;
      const centerY = p5.height / 2;
      for (let i = 0; i < this.pointAmount; i += 1) {
        const m = p5.map(i, 0, this.pointAmount, 0, p5.TWO_PI);
        const x = p5.cos(m) * radius + centerX - this.offset;
        const y = p5.sin(m) * radius + centerY - this.offset;
        this.points.push(new Point(p5, x, y));
      }

      for (let i = 0; i < this.pointAmount; i += 1) {
        const pt1 = this.points[i];
        const pt2 = this.points[i - 1 === -1 ? this.pointAmount - 1 : i - 1];
        this.lines.push(
          new LineBoundary(p5, pt1, pt2, this.color, this.thickness)
        );
      }
    } else if (Array.isArray(pointAmount)) {
      this.pointAmount = pointAmount.length;
      this.points = pointAmount;

      for (let i = 0; i < this.pointAmount; i += 1) {
        const pt1 = this.points[i];
        const pt2 = this.points[(i + 1) % this.pointAmount];
        this.lines.push(
          new LineBoundary(p5, pt1, pt2, this.color, this.thickness)
        );
      }
    }
  }

  show(darkMode: boolean, editing = false) {
    // this.p5.strokeWeight(2);
    const color = darkMode ? 250 : 30;
    this.p5.stroke(color);
    // this.p5.noFill();
    // this.p5.beginShapse();
    // for (let i = 0; i < this.points.length; i += 1)
    //   this.p5.vertex(this.points[i].x, this.points[i].y);
    // this.p5.endShape(this.p5.CLOSE);
    for (let i = 0; i < this.lines.length; i += 1)
      this.lines[i].show(editing, color, this.thickness);
  }
}

export default Boundary;
