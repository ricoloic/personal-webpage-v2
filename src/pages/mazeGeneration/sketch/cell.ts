import P5 from 'p5';

type Walls = {
  top: boolean;
  right: boolean;
  bottom: boolean;
  left: boolean;
};

type Sides = keyof Walls;

class Cell {
  public i: number;

  public j: number;

  public visited: boolean;

  public walls: Walls;

  public goalDistance: number;

  public heuristicDistance: number;

  public finalDistance: number;

  // eslint-disable-next-line no-use-before-define
  public previous: Cell | undefined;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.goalDistance = 0;
    this.heuristicDistance = 0;
    this.finalDistance = 0;
    this.visited = false;
    this.previous = undefined;
    this.walls = {
      top: true,
      right: true,
      bottom: true,
      left: true,
    };
  }

  getWallList() {
    return Object.entries(this.walls) as [Sides, boolean][];
  }

  markVisited() {
    this.visited = true;
  }

  removeWall(side: Sides) {
    this.walls[side] = false;
  }

  calculateFinalDistance() {
    this.finalDistance = this.goalDistance + this.heuristicDistance;
  }

  show(
    p5: P5,
    darkMode: boolean,
    scale: number,
    current: boolean,
    startNode: boolean,
    endNode: boolean,
    overrideColor: P5.Color | undefined
  ) {
    const x = this.i * scale;
    const y = this.j * scale;

    if (this.visited || endNode) {
      p5.noStroke();
      let color = current
        ? p5.color(30, 160, 190)
        : p5.color(darkMode ? 30 : 250);
      if (overrideColor) color = overrideColor;
      if (startNode || endNode)
        color = endNode ? p5.color(250, 50, 30) : p5.color(50, 200, 30);

      p5.fill(color);
      p5.rect(x, y, scale, scale);
    }

    p5.stroke(darkMode ? 250 : 30);
    p5.strokeWeight(2);

    const sides = this.getWallList();
    for (let k = 0; k < sides.length; k += 1) {
      const [side, active] = sides[k];
      if (active) {
        // eslint-disable-next-line default-case
        switch (side) {
          case 'top':
            p5.line(x, y, x + scale, y);
            break;
          case 'right':
            p5.line(x + scale, y, x + scale, y + scale);
            break;
          case 'bottom':
            p5.line(x, y + scale, x + scale, y + scale);
            break;
          case 'left':
            p5.line(x, y, x, y + scale);
            break;
        }
      }
    }
  }
}

export default Cell;
