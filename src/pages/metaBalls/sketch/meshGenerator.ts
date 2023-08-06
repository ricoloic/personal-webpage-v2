/* eslint-disable max-classes-per-file,no-param-reassign */
import P5 from 'p5';

class ControlNode {
  public position: P5.Vector;

  public active: boolean;

  public above: P5.Vector;

  public right: P5.Vector;

  public value: number;

  constructor(position: P5.Vector, active: boolean, value: number) {
    this.position = position;
    this.value = value;
    this.active = active;
    this.above = new P5.Vector(position.x, position.y);
    this.right = new P5.Vector(position.x, position.y);
  }
}

class Square {
  public topLeft: ControlNode;

  public topRight: ControlNode;

  public bottomRight: ControlNode;

  public bottomLeft: ControlNode;

  public configuration: number;

  constructor(
    topLeft: ControlNode,
    topRight: ControlNode,
    bottomRight: ControlNode,
    bottomLeft: ControlNode
  ) {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;

    this.configuration = 0;
    if (topLeft.active) this.configuration += 8;
    if (topRight.active) this.configuration += 4;
    if (bottomRight.active) this.configuration += 2;
    if (bottomLeft.active) this.configuration += 1;
  }
}

class SquareGrid {
  public squares: Square[][];

  constructor(map: [number, number][][], inverse = false) {
    const nodeCountX = map.length;
    const nodeCountY = map[0].length;

    const controlNodes: ControlNode[][] = [];
    for (let x = 0; x < nodeCountX; x += 1) {
      controlNodes[x] = [];
      for (let y = 0; y < nodeCountY; y += 1) {
        const position = new P5.Vector(x, y);
        controlNodes[x][y] = new ControlNode(
          position,
          map[x][y][0] === (inverse ? 0 : 1),
          map[x][y][1]
        );
      }
    }

    this.squares = [];
    for (let x = 0; x < nodeCountX - 1; x += 1) {
      this.squares[x] = [];
      for (let y = 0; y < nodeCountY - 1; y += 1) {
        this.squares[x][y] = new Square(
          controlNodes[x][y + 1],
          controlNodes[x + 1][y + 1],
          controlNodes[x + 1][y],
          controlNodes[x][y]
        );
      }
    }
  }
}

export default class MeshGenerator {
  private p5: P5;

  public squareGrid: SquareGrid;

  public squareSize: number;

  public lines: [P5.Vector, P5.Vector][];

  constructor(p5: P5, map: [number, number][][], squareSize: number) {
    this.p5 = p5;
    this.squareGrid = new SquareGrid(map);
    this.squareSize = squareSize;
    this.lines = [];
    for (let x = 0; x < this.squareGrid.squares.length; x += 1) {
      for (let y = 0; y < this.squareGrid.squares[x].length; y += 1) {
        const wallSquare = this.squareGrid.squares[x][y];
        this.triangulateSquare(wallSquare);
      }
    }
  }

  vLerp(
    v1: ControlNode,
    v2: ControlNode,
    pos: 'top' | 'bottom' | 'left' | 'right'
  ) {
    const isoLevel = 0.9;
    const p = new P5.Vector();

    // console.log(v1, v2);
    if (Math.abs(isoLevel - v1.value) < 0.00001) return v1.position.copy();
    if (Math.abs(isoLevel - v2.value) < 0.00001) return v2.position.copy();
    if (Math.abs(v1.value - v2.value) < 0.00001) return v1.position.copy();
    const mu = (isoLevel - v1.value) / (v2.value - v1.value);
    // console.log(mu);
    if (pos === 'top' || pos === 'bottom') {
      p.x = this.p5.lerp(v1.position.x, v2.position.x, mu);
      p.y = v1.position.y;
    } else {
      p.y = this.p5.lerp(v1.position.y, v2.position.y, mu);
      p.x = v1.position.x;
    }
    return p;
  }

  triangulateSquare(square: Square) {
    const top = this.vLerp(square.topLeft, square.topRight, 'top');
    const right = this.vLerp(square.topRight, square.bottomRight, 'right');
    const bottom = this.vLerp(square.bottomRight, square.bottomLeft, 'bottom');
    const left = this.vLerp(square.bottomLeft, square.topLeft, 'left');

    // eslint-disable-next-line default-case
    switch (square.configuration) {
      case 0:
      case 15:
        break;
      case 1:
      case 14:
        this.lines.push([left, bottom]);
        break;
      case 2:
      case 13:
        this.lines.push([bottom, right]);
        break;
      case 4:
      case 11:
        this.lines.push([right, top]);
        break;
      case 8:
      case 7:
        this.lines.push([top, left]);
        break;
      case 3:
      case 12:
        this.lines.push([right, left]);
        break;
      case 6:
      case 9:
        this.lines.push([top, bottom]);
        break;
      case 5:
        this.lines.push([top, right]);
        this.lines.push([bottom, left]);
        break;
      case 10:
        this.lines.push([top, right]);
        this.lines.push([bottom, left]);
        break;
    }
  }

  show(darkMode: boolean) {
    this.p5.stroke(darkMode ? 250 : 30);
    for (let i = 0; i < this.lines.length; i += 1) {
      const line = this.lines[i];
      this.p5.line(
        line[0].x * this.squareSize,
        line[0].y * this.squareSize,
        line[1].x * this.squareSize,
        line[1].y * this.squareSize
      );
    }
  }
}
