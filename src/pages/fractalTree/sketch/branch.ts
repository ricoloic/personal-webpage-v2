import P5 from 'p5';

class Branch {
  private length: number;

  private origin: P5.Vector;

  private end: P5.Vector;

  private angle: number;

  private displacementAngle: number;

  // eslint-disable-next-line no-use-before-define
  private left: Branch | undefined;

  // eslint-disable-next-line no-use-before-define
  private right: Branch | undefined;

  constructor(
    length: number,
    origin: P5.Vector,
    angle: number,
    displacementAngle: number
  ) {
    this.length = length;
    this.origin = origin;
    this.end = origin.copy().add(P5.Vector.fromAngle(angle).mult(length));
    this.angle = angle;
    this.displacementAngle = displacementAngle;

    const childLength = (this.length / 3) * 2;

    if (length > 3) {
      this.left = new Branch(
        childLength,
        this.end,
        this.angle - displacementAngle,
        displacementAngle
      );
      this.right = new Branch(
        childLength,
        this.end,
        this.angle + displacementAngle,
        displacementAngle
      );
    }
  }

  show(p5: P5, darkMode: boolean) {
    p5.stroke(darkMode ? 250 : 30);
    p5.line(this.origin.x, this.origin.y, this.end.x, this.end.y);

    if (this.left) this.left.show(p5, darkMode);
    if (this.right) this.right.show(p5, darkMode);
  }
}

export default Branch;
