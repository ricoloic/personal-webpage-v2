import P5 from 'p5';

export class Particle {
  private p5: P5;

  public pos: P5.Vector;

  private vel: P5.Vector;

  private acc: P5.Vector;

  private radius: number;

  private maxLifeTime: number;

  public lifeTime: number;

  private trails: P5.Vector[];

  constructor(p5: P5, { x = 0, y = 0 }, radius = 5, maxLifeTime = 25) {
    this.p5 = p5;
    this.pos = this.p5.createVector(x, y);
    // this.vel = createVector(random(0.5, 1), random(0.5, 1)).setMag(3);
    this.vel = this.p5.createVector(0, 1).setMag(3);
    this.acc = this.p5.createVector();
    this.radius = radius;
    this.maxLifeTime = maxLifeTime;
    this.lifeTime = maxLifeTime;
    this.trails = [];
  }

  applyForce(force: P5.Vector) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.setMag(0);
    this.acc.limit(4);
  }

  updateLifeTime() {
    this.lifeTime = this.lifeTime > 1 ? this.lifeTime - 1 : 0;
  }

  show(darkMode: boolean) {
    this.p5.fill(darkMode ? 250 : 30);
    this.p5.noStroke();
    this.p5.ellipse(this.pos.x, this.pos.y, this.radius * 2);
  }

  showTrail(darkMode: boolean, trailLife = 300) {
    this.trails.push(this.pos.copy());
    if (this.trails.length > trailLife) this.trails.splice(0, 1);
    this.p5.stroke(darkMode ? 250 : 30);
    for (let i = 0; i < this.trails.length; i += 1) {
      if (i !== 0) {
        const current = this.trails[i];
        const prev = this.trails[i - 1];
        this.p5.line(current.x, current.y, prev.x, prev.y);
      }
    }
  }
}

export default Particle;
