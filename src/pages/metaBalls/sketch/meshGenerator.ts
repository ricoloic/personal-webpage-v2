/* eslint-disable max-classes-per-file,no-param-reassign */
import P5 from 'p5';

function lerp(a: number, b: number, alpha: number) {
  return a + alpha * (b - a);
}

class ControlNode {
  public position: P5.Vector;

  public active: boolean;

  public above: P5.Vector;

  public right: P5.Vector;

  public value: number;

  constructor(
    position: P5.Vector,
    active: boolean,
    squareSize: number,
    value: number
  ) {
    this.position = position;
    this.value = value;
    this.active = active;
    this.above = new P5.Vector(position.x, position.y + squareSize / 2);
    this.right = new P5.Vector(position.x + squareSize / 2, position.y);
  }
}

class Square {
  public topLeft: ControlNode;

  public topRight: ControlNode;

  public bottomRight: ControlNode;

  public bottomLeft: ControlNode;

  public centerTop: P5.Vector;

  public centerRight: P5.Vector;

  public centerBottom: P5.Vector;

  public centerLeft: P5.Vector;

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

    this.centerTop = topLeft.right;
    this.centerRight = bottomRight.above;
    this.centerBottom = bottomLeft.right;
    this.centerLeft = bottomLeft.above;

    this.configuration = 0;
    if (topLeft.active) this.configuration += 8;
    if (topRight.active) this.configuration += 4;
    if (bottomRight.active) this.configuration += 2;
    if (bottomLeft.active) this.configuration += 1;
  }
}

class SquareGrid {
  public squares: Square[][];

  constructor(map: [number, number][][], squareSize: number, inverse = false) {
    const nodeCountX = map.length;
    const nodeCountY = map[0].length;
    const mapWidth = nodeCountX * squareSize;
    const mapHeight = nodeCountY * squareSize;

    const controlNodes: ControlNode[][] = [];
    for (let x = 0; x < nodeCountX; x += 1) {
      controlNodes[x] = [];
      for (let y = 0; y < nodeCountY; y += 1) {
        const position = new P5.Vector(
          -mapWidth / 2 + x * squareSize,
          -mapHeight / 2 + y * squareSize
        );
        controlNodes[x][y] = new ControlNode(
          position,
          map[x][y][0] === (inverse ? 0 : 1),
          squareSize,
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
  public squareGrid: SquareGrid;

  public squareSize: number;

  public lines: [P5.Vector, P5.Vector][];

  constructor(map: [number, number][][], squareSize: number) {
    this.squareGrid = new SquareGrid(map, squareSize);
    this.squareSize = squareSize;
    this.lines = [];
    for (let x = 0; x < this.squareGrid.squares.length; x += 1) {
      for (let y = 0; y < this.squareGrid.squares[x].length; y += 1) {
        const wallSquare = this.squareGrid.squares[x][y];
        this.triangulateSquare(wallSquare);
      }
    }
  }

  static lerpControlNode(
    v1: ControlNode,
    v2: ControlNode,
    axis: 'x' | 'y',
    alfa: number
  ) {
    const result = v1.position.copy();
    result[axis] = lerp(v1.position[axis], v2.position[axis], alfa);
    return result;
  }

  triangulateSquare(square: Square) {
    // eslint-disable-next-line default-case
    switch (square.configuration) {
      case 0:
        break;

      // 1 active point cases
      case 1:
        this.lines.push([square.centerLeft, square.centerBottom]);
        break;
      case 2:
        this.lines.push([square.centerBottom, square.centerRight]);
        break;
      case 4:
        this.lines.push([square.centerRight, square.centerTop]);
        break;
      case 8:
        this.lines.push([square.centerTop, square.centerLeft]);
        break;

      // 2 active points cases
      case 3:
      case 12:
        this.lines.push([square.centerRight, square.centerLeft]);
        break;
      case 6:
      case 9:
        this.lines.push([square.centerTop, square.centerBottom]);
        break;
      case 5:
        this.lines.push([square.centerTop, square.centerRight]);
        this.lines.push([square.centerBottom, square.centerLeft]);
        break;
      case 10:
        this.lines.push([square.centerTop, square.centerRight]);
        this.lines.push([square.centerBottom, square.centerLeft]);
        break;

      // 3 active points cases
      case 7:
        this.lines.push([square.centerTop, square.centerLeft]);
        break;
      case 11:
        this.lines.push([square.centerTop, square.centerRight]);
        break;
      case 13:
        this.lines.push([square.centerRight, square.centerBottom]);
        break;
      case 14:
        this.lines.push([square.centerBottom, square.centerLeft]);
        break;

      // 4 active points cases
      case 15:
        break;
    }
  }

  show(p5: P5, darkMode: boolean) {
    p5.stroke(darkMode ? 250 : 30);
    for (let i = 0; i < this.lines.length; i += 1) {
      const line = this.lines[i];
      p5.line(line[0].x, line[0].y, line[1].x, line[1].y);
    }
  }
}
