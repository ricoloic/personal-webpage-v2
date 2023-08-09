import P5 from 'p5';
import Cell from './cell';

function randomInArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

class Maze {
  private columnAmount: number;

  private rowAmount: number;

  private map: Cell[];

  private stack: Cell[];

  private startCell: Cell;

  private endCell: Cell;

  private openSet: Cell[];

  private closedSet: Cell[];

  private path: Cell[];

  constructor(columnAmount: number, rowAmount: number) {
    this.columnAmount = columnAmount;
    this.rowAmount = rowAmount;
    this.map = [];
    this.stack = [];
    this.openSet = [];
    this.closedSet = [];
    this.path = [];

    for (let j = 0; j < this.rowAmount; j += 1) {
      for (let i = 0; i < this.columnAmount; i += 1) {
        this.map.push(new Cell(i, j));
      }
    }

    this.endCell = this.map[this.map.length - 1];
    [this.startCell] = this.map;
    this.stack.push(this.startCell);

    [this.openSet[0]] = this.map;
  }

  index(i: number, j: number) {
    if (i < 0 || i >= this.columnAmount || j < 0 || j >= this.rowAmount)
      return -1;
    return i + j * this.columnAmount;
  }

  getCell(i: number, j: number): Cell | undefined {
    return this.map[this.index(i, j)];
  }

  getCurrentCell() {
    return this.stack[this.stack.length - 1];
  }

  getNeighborCells(i: number, j: number) {
    const neighbors = [];

    const top = this.getCell(i, j - 1);
    const right = this.getCell(i + 1, j);
    const bottom = this.getCell(i, j + 1);
    const left = this.getCell(i - 1, j);

    if (top) neighbors.push(top);
    if (right) neighbors.push(right);
    if (bottom) neighbors.push(bottom);
    if (left) neighbors.push(left);

    return neighbors;
  }

  getOpenNeighborCells(i: number, j: number) {
    const neighbors = [];

    const current = this.getCell(i, j)!;
    const top = this.getCell(i, j - 1);
    const right = this.getCell(i + 1, j);
    const bottom = this.getCell(i, j + 1);
    const left = this.getCell(i - 1, j);

    if (!current.walls.top && top) neighbors.push(top);
    if (!current.walls.right && right) neighbors.push(right);
    if (!current.walls.bottom && bottom) neighbors.push(bottom);
    if (!current.walls.left && left) neighbors.push(left);

    return neighbors;
  }

  getUnvisitedNeighborCells(i: number, j: number) {
    const neighbors = this.getNeighborCells(i, j);
    const unvisitedNeighbors = [];

    for (let k = 0; k < neighbors.length; k += 1) {
      if (!neighbors[k].visited) unvisitedNeighbors.push(neighbors[k]);
    }

    return unvisitedNeighbors;
  }

  mazeStep() {
    if (this.stack.length === 0) return;
    const cell = this.stack.pop()!;
    cell.markVisited();
    const unvisitedNeighbors = this.getUnvisitedNeighborCells(cell.i, cell.j);
    if (unvisitedNeighbors.length === 0) return;

    this.stack.push(cell);
    const next = randomInArray(unvisitedNeighbors);

    // top
    if (cell.i === next.i && cell.j > next.j) {
      cell.removeWall('top');
      next.removeWall('bottom');
    }
    // right
    else if (cell.i < next.i && cell.j === next.j) {
      cell.removeWall('right');
      next.removeWall('left');
    }
    // bottom
    else if (cell.i === next.i && cell.j < next.j) {
      cell.removeWall('bottom');
      next.removeWall('top');
    }
    // left
    else if (cell.i > next.i && cell.j === next.j) {
      cell.removeWall('left');
      next.removeWall('right');
    }

    next.markVisited();
    this.stack.push(next);
  }

  static calculateHeuristic(a: Cell, b: Cell) {
    return Math.sqrt((b.i - a.i) * 2 + (b.j - a.i) * 2);
  }

  solveStep() {
    if (this.openSet.length === 0) return;
    let current = 0;
    for (let k = 0; k < this.openSet.length; k += 1) {
      if (this.openSet[current].goalDistance < this.openSet[k].goalDistance)
        current = k;
    }

    if (this.openSet[current] === this.endCell) {
      let tempCell = this.openSet[current];
      while (tempCell.previous) {
        this.path.push(tempCell);
        tempCell = tempCell.previous;
      }
      this.openSet = [];
      this.closedSet = [];
      return;
    }

    const [removed] = this.openSet.splice(current, 1);
    this.closedSet.push(removed);

    const neighbors = this.getOpenNeighborCells(removed.i, removed.j);

    for (let k = 0; k < neighbors.length; k += 1) {
      const neighborInClosedSet = this.closedSet.includes(neighbors[k]);
      if (!neighborInClosedSet) {
        const neighborInOpenSet = this.openSet.includes(neighbors[k]);
        const tempGoalDistance = removed.goalDistance + 1;
        if (neighborInOpenSet) {
          if (tempGoalDistance < neighbors[k].goalDistance)
            neighbors[k].goalDistance = tempGoalDistance;
        } else {
          neighbors[k].goalDistance = tempGoalDistance;
          this.openSet.push(neighbors[k]);
        }

        neighbors[k].heuristicDistance = Maze.calculateHeuristic(
          neighbors[k],
          this.endCell
        );

        neighbors[k].calculateFinalDistance();
        neighbors[k].previous = removed;
      }
    }
  }

  finished() {
    return this.stack.length === 0;
  }

  show(p5: P5, darkMode: boolean, scale: number) {
    for (let k = 0; k < this.map.length; k += 1) {
      const inOpenSet = this.openSet.includes(this.map[k]);
      const inClosedSet = this.closedSet.includes(this.map[k]);
      const inPath = this.path.includes(this.map[k]);

      let overrideColor;

      if (inOpenSet || inClosedSet)
        if (inOpenSet) overrideColor = p5.color(100, 100, 50);
        else overrideColor = p5.color(70, 100, 70);
      else if (inPath) overrideColor = p5.color(20, 120, 130);

      this.map[k].show(
        p5,
        darkMode,
        scale,
        this.map[k] === this.getCurrentCell(),
        this.map[k] === this.startCell,
        this.map[k] === this.endCell,
        overrideColor
      );
    }
  }
}

export default Maze;
