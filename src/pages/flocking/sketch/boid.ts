import P5 from 'p5';

class Boid {
  private p5: P5;

  public pos: P5.Vector;

  private vel: P5.Vector;

  private acc: P5.Vector;

  private maxForce: number;

  private maxSpeed: number;

  private size: number;

  public static forces = {
    alignmentForce: 0.5,
    cohesionForce: 0.2,
    separationForce: 3,
  };

  constructor(p5: P5) {
    this.p5 = p5;
    this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height));
    this.vel = P5.Vector.random2D().setMag(4);
    this.acc = p5.createVector();
    this.maxForce = 0.3;
    this.maxSpeed = 3;
    this.size = 3;
  }

  checkEdges() {
    if (this.pos.x < 0) this.pos.x = this.p5.width;
    else if (this.pos.x > this.p5.width) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = this.p5.height;
    else if (this.pos.y > this.p5.height) this.pos.y = 0;
  }

  applyForce(force: P5.Vector) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.setMag(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show(darkMode: boolean) {
    // strokeWeight(16);
    const color = darkMode ? 250 : 30;
    this.p5.stroke(color);
    this.p5.fill(color);
    // point(this.pos.x, this.pos.y);
    this.p5.push();
    this.p5.strokeWeight(1);
    this.p5.translate(this.pos.x, this.pos.y);
    this.p5.rotate(this.vel.heading());
    this.p5.triangle(0, this.size / 2, 0, -this.size / 2, this.size * 2, 0);
    this.p5.pop();
  }

  flock(
    darkMode: boolean,
    boids: Boid[],
    {
      alignmentForce = Boid.forces.alignmentForce,
      cohesionForce = Boid.forces.cohesionForce,
      separationForce = Boid.forces.separationForce,
    } = Boid.forces
  ) {
    const steering1 = this.p5.createVector(0, 0);
    const steering2 = this.p5.createVector(0, 0);
    const steering3 = this.p5.createVector(0, 0);
    let total1 = 0;
    let total2 = 0;
    let total3 = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const boid of boids) {
      const distance = this.p5.dist(
        boid.pos.x,
        boid.pos.y,
        this.pos.x,
        this.pos.y
      );
      if (boid !== this) {
        if (distance < 45) {
          steering1.add(boid.vel);
          total1 += 1;
        }
        if (distance < 30) {
          steering2.add(boid.pos);
          total2 += 1;
        }
        if (distance < 35) {
          steering3.add(P5.Vector.sub(this.pos, boid.pos).div(distance));
          total3 += 1;
        }
      }
    }

    if (total1 > 0) {
      steering1
        .div(total1)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(alignmentForce);
    }
    if (total2 > 0) {
      steering2
        .div(total2)
        .sub(this.pos)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(cohesionForce);
    }
    if (total3 > 0) {
      steering3
        .div(total3)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(separationForce);
    }
    this.applyForce(steering1);
    this.applyForce(steering2);
    this.applyForce(steering3);

    this.checkEdges();
    this.update();
    this.show(darkMode);
  }
}

export default Boid;
