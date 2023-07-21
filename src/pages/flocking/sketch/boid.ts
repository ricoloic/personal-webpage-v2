import P5 from 'p5';

class Boid {
  private p5: P5;

  public pos: P5.Vector;

  private vel: P5.Vector;

  private acc: P5.Vector;

  private maxForce: number;

  private maxSpeed: number;

  private size: number;

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

  // eslint-disable-next-line @typescript-eslint/ban-types
  flockInBoids(boids: Boid[], action: Function, perceptionRadius = 50) {
    let steeringAmount = this.p5.createVector(0, 0);
    let total = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const boid of boids) {
      const distance = this.p5.dist(
        boid.pos.x,
        boid.pos.y,
        this.pos.x,
        this.pos.y
      );
      if (boid !== this && distance < perceptionRadius) {
        steeringAmount = action(boid, steeringAmount, distance);
        total += 1;
      }
    }

    return { steeringAmount, total };
  }

  alignment(boids: Boid[], alignmentForce = 0.7) {
    const { steeringAmount, total } = this.flockInBoids(
      boids,
      (boid: Boid, steering: P5.Vector) => steering.add(boid.vel),
      45
    );
    if (total > 0) {
      steeringAmount
        .div(total)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(alignmentForce);
    }
    this.applyForce(steeringAmount);
  }

  cohesion(boids: Boid[], cohesionForce = 0.3) {
    const { steeringAmount, total } = this.flockInBoids(
      boids,
      (boid: Boid, steering: P5.Vector) => steering.add(boid.pos),
      30
    );

    if (total > 0) {
      steeringAmount
        .div(total)
        .sub(this.pos)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(cohesionForce);
    }

    this.applyForce(steeringAmount);
  }

  separation(boids: Boid[], separationForce = 5) {
    const { steeringAmount, total } = this.flockInBoids(
      boids,
      // eslint-disable-next-line arrow-body-style
      (boid: Boid, steering: P5.Vector, distance: P5.Vector) =>
        steering.add(P5.Vector.sub(this.pos, boid.pos).div(distance)),
      12
    );

    if (total > 0) {
      steeringAmount
        .div(total)
        .sub(this.vel)
        .limit(this.maxForce)
        .mult(separationForce);
    }

    this.applyForce(steeringAmount);
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
    { alignmentForce = 0.7, cohesionForce = 0.3, separationForce = 5 } = {
      alignmentForce: 0.7,
      cohesionForce: 0.3,
      separationForce: 5,
    }
  ) {
    this.alignment(boids, alignmentForce);
    this.cohesion(boids, cohesionForce);
    this.separation(boids, separationForce);
    this.checkEdges();
    this.update();
    this.show(darkMode);
  }
}

export default Boid;
