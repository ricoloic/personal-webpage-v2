import P5 from 'p5';

export default class Point {
  private p5: P5;

  private weight: number;

  private text: string;

  public vector: P5.Vector;

  public isSelected: boolean;

  constructor(p5: P5, x: number, y: number, weight = 10, text = '') {
    this.p5 = p5;
    this.weight = weight;
    this.text = text;
    this.vector = p5.createVector(x, y);
    this.isSelected = false;
  }

  mouseHover() {
    return (
      this.p5.dist(
        this.p5.mouseX,
        this.p5.mouseY,
        this.vector.x,
        this.vector.y
      ) <= this.weight
    );
  }

  update() {
    if (this.isSelected) {
      this.vector.set(this.p5.mouseX, this.p5.mouseY);
    }
  }

  show(darkMode: boolean) {
    this.p5.stroke(darkMode ? 250 : 30);
    this.p5.strokeWeight(this.weight);
    this.p5.point(this.vector.x, this.vector.y);
    this.p5.strokeWeight(1);
    this.p5.push();
    this.p5.translate(15, 15);
    this.p5.text(this.text, this.vector.x, this.vector.y);
    this.p5.pop();
  }

  lineToPoint(point: Point) {
    this.p5.strokeWeight(1);
    this.p5.stroke('#f96e46');
    this.p5.line(this.vector.x, this.vector.y, point.vector.x, point.vector.y);
  }
}
