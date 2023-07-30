import P5 from 'p5';

export class MapGenerator {
  private p5: P5;

  private width: number;

  private height: number;

  private randomFillPercent: number;

  private map: number[][];

  private seed: number;

  private useRandomSeed: boolean;

  constructor(
    p5: P5,
    width: number,
    height: number,
    randomFillPercent: number
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.randomFillPercent = randomFillPercent;
    this.map = [];
    this.seed = 0;
    this.useRandomSeed = true;

    this.generateMap();
    this.randomFillMap();
    for (let i = 0; i < 5; i += 1) this.smoothMap();
  }

  generateMap() {
    this.map.length = this.width;
    for (let x = 0; x < this.map.length; x += 1) {
      this.map[x] = new Array(this.height);
    }
  }

  randomFillMap() {
    this.p5.randomSeed(
      this.useRandomSeed ? this.p5.random(0, 100000) : this.seed
    );

    const percent = this.randomFillPercent / 100;

    for (let x = 0; x < this.map.length; x += 1) {
      for (let y = 0; y < this.map[x].length; y += 1) {
        let value = this.p5.random() > percent ? 0 : 1;
        if (
          x === 0 ||
          x === this.map.length - 1 ||
          y === 0 ||
          y === this.map[x].length - 1
        )
          value = 1;
        this.map[x][y] = value;
      }
    }
  }

  smoothMap() {
    const tempMap = this.map.slice();
    for (let x = 0; x < this.map.length; x += 1) {
      for (let y = 0; y < this.map[x].length; y += 1) {
        const neighbourCount = this.getSurroundingNeighbourCount(x, y);
        if (neighbourCount < 4) tempMap[x][y] = 0;
        else if (neighbourCount > 4) tempMap[x][y] = 1;
      }
    }
    this.map = tempMap;
  }

  getSurroundingNeighbourCount(gridX: number, gridY: number) {
    let neighbourCount = 0;

    for (let neighbourX = gridX - 1; neighbourX <= gridX + 1; neighbourX += 1) {
      for (
        let neighbourY = gridY - 1;
        neighbourY <= gridY + 1;
        neighbourY += 1
      ) {
        const isOutOfRange =
          neighbourX < 0 ||
          neighbourX >= this.map.length ||
          neighbourY < 0 ||
          neighbourY >= this.map[neighbourX].length;
        if (!isOutOfRange) {
          const isCurrentGrid = neighbourX === gridX && neighbourY === gridY;
          if (!isCurrentGrid) {
            neighbourCount += this.map[neighbourX][neighbourY];
          }
        } else {
          neighbourCount += 1;
        }
      }
    }

    return neighbourCount;
  }

  show(darkMode: boolean, scale: number) {
    this.p5.noStroke();
    for (let x = 0; x < this.map.length; x += 1) {
      for (let y = 0; y < this.map[x].length; y += 1) {
        if (darkMode) {
          this.p5.fill(this.map[x][y] ? 30 : 250);
        } else {
          this.p5.fill(this.map[x][y] ? 250 : 30);
        }
        this.p5.rect(x * scale, y * scale, scale, scale);
      }
    }
  }
}

export default MapGenerator;
