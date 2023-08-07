// eslint-disable-next-line max-classes-per-file
import P5 from 'p5';
import LineBoundary from './lineBoundary';
import Ray from './ray';

class PointAngle {
  public point: P5.Vector;

  public angle: number;

  constructor(point: P5.Vector, angle: number) {
    this.point = point;
    this.angle = angle;
  }

  getAngle() {
    return this.angle;
  }
}

class Caster {
  private p5: P5;

  public radius = 10;

  public rayColor = 150;

  public rayThickness = 1;

  public position: P5.Vector;

  public rayBackGroundColor: number;

  constructor(
    p5: P5,
    position: P5.Vector,
    rayBackGroundColor = 250,
    rayColor = 150,
    rayThickness = 1
  ) {
    this.p5 = p5;
    this.position = position;
    this.rayColor = rayColor;
    this.rayThickness = rayThickness;
    this.rayBackGroundColor = rayBackGroundColor;
  }

  castRays(lines: LineBoundary[]) {
    const rays = this.makeRays(lines);
    const foundIntersections = this.findIntersections(rays, lines);

    foundIntersections.sort((a, b) => a.getAngle() - b.getAngle());
    this.p5.strokeWeight(this.rayThickness);
    this.p5.stroke(this.rayColor);
    for (let i = 0; i < foundIntersections.length; i += 1) {
      const pa = foundIntersections[i];
      this.p5.line(this.position.x, this.position.y, pa.point.x, pa.point.y);
    }
  }

  castBackground(
    lines: LineBoundary[],
    color: number = this.rayBackGroundColor
  ) {
    const rays = this.makeRays(lines);
    const foundIntersections = this.findIntersections(rays, lines);

    foundIntersections.sort((a, b) => a.getAngle() - b.getAngle());
    this.p5.noStroke();
    this.p5.fill(color);
    this.p5.beginShape();
    for (let i = 0; i < foundIntersections.length; i += 1) {
      const pa = foundIntersections[i];
      this.p5.vertex(pa.point.x, pa.point.y);
    }
    this.p5.endShape();
  }

  castPoint() {
    this.p5.stroke(255, 0, 0);
    this.p5.strokeWeight(10);
    this.p5.point(this.position.x, this.position.y);
  }

  private findIntersections(rays: Ray[], lines: LineBoundary[]) {
    const foundIntersections: PointAngle[] = [];
    for (let i = 0; i < rays.length; i += 1) {
      let closest: P5.Vector | null = null;
      let min = Infinity;

      for (let j = 0; j < lines.length; j += 1) {
        const intersection = rays[i].cast(lines[j]);

        if (intersection != null) {
          const distance = this.position.dist(intersection);
          if (distance < min) {
            min = distance;
            closest = intersection;
          }
        }
      }

      if (closest != null) {
        foundIntersections.push(new PointAngle(closest, rays[i].angle));
      }
    }
    return foundIntersections;
  }

  private makeRays(lines: LineBoundary[]) {
    const rays: Ray[] = [];

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      const angles: number[] = [];

      const displacement = 0.001;

      const a = P5.Vector.sub(line.pt1, this.position).normalize().heading();
      angles.push(a);
      angles.push(a + displacement);
      angles.push(a - displacement);
      const b = P5.Vector.sub(line.pt2, this.position).normalize().heading();
      angles.push(b);
      angles.push(b + displacement);
      angles.push(b - displacement);

      for (let j = 0; j < angles.length; j += 1) {
        const angle = angles[j];
        rays.push(new Ray(this.position, angle));
      }
    }

    return rays;
  }

  setPosition(x: number, y: number) {
    this.position.set(x, y);
  }
}

export default Caster;
