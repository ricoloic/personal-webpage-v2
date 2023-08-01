/* eslint-disable max-classes-per-file,no-param-reassign */
import P5 from 'p5';

class Node {
  public position: P5.Vector;

  public vertexIndex = -1;

  constructor(position: P5.Vector) {
    this.position = position;
  }
}

class ControlNode extends Node {
  public active: boolean;

  public above: Node;

  public right: Node;

  constructor(position: P5.Vector, active: boolean, squareSize: number) {
    super(position);
    this.active = active;
    this.above = new Node(
      new P5.Vector(position.x, position.y + squareSize / 2)
    );
    this.right = new Node(
      new P5.Vector(position.x + squareSize / 2, position.y)
    );
  }
}

class Square {
  public topLeft: ControlNode;

  public topRight: ControlNode;

  public bottomRight: ControlNode;

  public bottomLeft: ControlNode;

  public centerTop: Node;

  public centerRight: Node;

  public centerBottom: Node;

  public centerLeft: Node;

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

  constructor(map: number[][], squareSize: number, inverse = false) {
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
          map[x][y] === (inverse ? 0 : 1),
          squareSize
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

class Mesh {
  public vertices: P5.Vector[];

  public triangles: number[][];

  constructor() {
    this.vertices = [];
    this.triangles = [];
  }

  show(
    p5: P5,
    darkMode: boolean,
    showMesh: boolean,
    gray: number | undefined = undefined
  ) {
    let color = gray;
    if (!color) {
      if (showMesh) {
        color = darkMode ? 250 : 30;
      } else {
        color = darkMode ? 30 : 250;
      }
    }
    p5.strokeWeight(gray ? 5 : 1);
    p5.stroke(color);
    if (showMesh) {
      p5.noFill();
    } else {
      p5.fill(color);
    }
    for (let i = 0; i < this.triangles.length; i += 1) {
      const face = this.triangles[i];
      p5.beginShape();
      for (let j = 0; j < face.length; j += 1) {
        const vertexIndex = face[j];
        const vertex = this.vertices[vertexIndex];

        p5.vertex(vertex.x, vertex.y);
      }
      p5.endShape(p5.CLOSE);
    }
  }
}

class Triangle {
  public vertexIndexA: number;

  public vertexIndexB: number;

  public vertexIndexC: number;

  private readonly vertices: [number, number, number];

  constructor(a: number, b: number, c: number) {
    this.vertexIndexA = a;
    this.vertexIndexB = b;
    this.vertexIndexC = c;
    this.vertices = [a, b, c];
  }

  index(index: number) {
    return this.vertices[index];
  }

  contain(vertexIndex: number) {
    return (
      this.vertexIndexA === vertexIndex ||
      this.vertexIndexB === vertexIndex ||
      this.vertexIndexC === vertexIndex
    );
  }
}

export default class MeshGenerator {
  public squareGrid: SquareGrid;

  public squareSize: number;

  public mesh: Mesh;

  public wallMesh: Mesh;

  private triangleDictionary: { [vertexIndex: number]: Triangle[] };

  public outlines: number[][];

  public checkedVertices: Set<number>;

  constructor(map: number[][], squareSize: number) {
    this.squareGrid = new SquareGrid(map, squareSize);
    this.squareSize = squareSize;
    this.triangleDictionary = {};
    this.outlines = [];
    this.checkedVertices = new Set();

    this.mesh = new Mesh();
    this.wallMesh = new Mesh();
    for (let x = 0; x < this.squareGrid.squares.length; x += 1) {
      for (let y = 0; y < this.squareGrid.squares[x].length; y += 1) {
        const wallSquare = this.squareGrid.squares[x][y];
        this.triangulateSquare(wallSquare);
      }
    }

    this.createWallMesh();
  }

  createWallMesh() {
    this.calculateMeshOutlines();

    this.wallMesh = new Mesh();
    for (let i = 0; i < this.outlines.length; i += 1) {
      const outline = this.outlines[i];
      for (let j = 0; j < outline.length - 1; j += 1) {
        const startIndex = this.wallMesh.vertices.length;
        this.wallMesh.vertices.push(this.mesh.vertices[outline[j]]); // left vertex
        this.wallMesh.vertices.push(this.mesh.vertices[outline[j + 1]]); // right vertex
        this.wallMesh.vertices.push(this.mesh.vertices[outline[j]]); // bottom left vertex
        this.wallMesh.vertices.push(this.mesh.vertices[outline[j + 1]]); // bottom right vertex

        this.wallMesh.triangles.push([
          startIndex,
          startIndex + 2,
          startIndex + 3,
        ]);
        this.wallMesh.triangles.push([
          startIndex + 3,
          startIndex + 1,
          startIndex,
        ]);
      }
    }
  }

  meshFromPoint(...points: Node[]) {
    this.assignVertices(points);

    if (points.length >= 3)
      this.createTriangle(points[0], points[1], points[2]);
    if (points.length >= 4)
      this.createTriangle(points[0], points[2], points[3]);
    if (points.length >= 5)
      this.createTriangle(points[0], points[3], points[4]);
    if (points.length >= 6)
      this.createTriangle(points[0], points[4], points[5]);
  }

  assignVertices(points: Node[]) {
    for (let i = 0; i < points.length; i += 1) {
      if (points[i].vertexIndex === -1) {
        points[i].vertexIndex = this.mesh.vertices.length;
        this.mesh.vertices.push(points[i].position);
      }
    }
  }

  createTriangle(nodeA: Node, nodeB: Node, nodeC: Node) {
    this.mesh.triangles.push([
      nodeA.vertexIndex,
      nodeB.vertexIndex,
      nodeC.vertexIndex,
    ]);

    const triangle = new Triangle(
      nodeA.vertexIndex,
      nodeB.vertexIndex,
      nodeC.vertexIndex
    );
    this.addTriangleToDictionary(triangle.vertexIndexA, triangle);
    this.addTriangleToDictionary(triangle.vertexIndexB, triangle);
    this.addTriangleToDictionary(triangle.vertexIndexC, triangle);
  }

  addTriangleToDictionary(vertexIndex: number, triangle: Triangle) {
    if (this.triangleDictionary[vertexIndex]) {
      this.triangleDictionary[vertexIndex].push(triangle);
    } else {
      this.triangleDictionary[vertexIndex] = [triangle];
    }
  }

  calculateMeshOutlines() {
    for (
      let vertexIndex = 0;
      vertexIndex < this.mesh.vertices.length;
      vertexIndex += 1
    ) {
      if (!this.checkedVertices.has(vertexIndex)) {
        const newOutlineVertex = this.getConnectedOutlineVertex(vertexIndex);
        if (newOutlineVertex !== -1) {
          this.checkedVertices.add(vertexIndex);

          const newOutline = [vertexIndex];
          this.outlines.push(newOutline);
          this.followOutline(newOutlineVertex, this.outlines.length - 1);
          this.outlines[this.outlines.length - 1].push(vertexIndex);
        }
      }
    }
  }

  followOutline(vertexIndex: number, outlineIndex: number) {
    this.outlines[outlineIndex].push(vertexIndex);
    this.checkedVertices.add(vertexIndex);
    const nextVertexIndex = this.getConnectedOutlineVertex(vertexIndex);

    if (nextVertexIndex !== -1) {
      this.followOutline(nextVertexIndex, outlineIndex);
    }
  }

  getConnectedOutlineVertex(vertexIndex: number) {
    const trianglesContainingVertex = this.triangleDictionary[vertexIndex];

    for (let i = 0; i < trianglesContainingVertex.length; i += 1) {
      const triangle = trianglesContainingVertex[i];

      for (let j = 0; j < 3; j += 1) {
        const vertexB = triangle.index(j);
        if (vertexB !== vertexIndex && !this.checkedVertices.has(vertexB)) {
          if (this.isOutlineEdge(vertexIndex, vertexB)) {
            return vertexB;
          }
        }
      }
    }

    return -1;
  }

  isOutlineEdge(vertexA: number, vertexB: number) {
    const trianglesContainingVertexA = this.triangleDictionary[vertexA];

    let sharedTriangleCount = 0;

    for (let i = 0; i < trianglesContainingVertexA.length; i += 1) {
      if (trianglesContainingVertexA[i].contain(vertexB)) {
        sharedTriangleCount += 1;
        if (sharedTriangleCount > 1) break;
      }
    }

    return sharedTriangleCount === 1;
  }

  triangulateSquare(square: Square) {
    // eslint-disable-next-line default-case
    switch (square.configuration) {
      case 0:
        break;

      // 1 active point cases
      case 1:
        this.meshFromPoint(
          square.centerLeft,
          square.centerBottom,
          square.bottomLeft
        );
        break;
      case 2:
        this.meshFromPoint(
          square.bottomRight,
          square.centerBottom,
          square.centerRight
        );
        break;
      case 4:
        this.meshFromPoint(
          square.topRight,
          square.centerRight,
          square.centerTop
        );
        break;
      case 8:
        this.meshFromPoint(square.topLeft, square.centerTop, square.centerLeft);
        break;

      // 2 active points cases
      case 3:
        this.meshFromPoint(
          square.centerRight,
          square.bottomRight,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      case 6:
        this.meshFromPoint(
          square.centerTop,
          square.topRight,
          square.bottomRight,
          square.centerBottom
        );
        break;
      case 9:
        this.meshFromPoint(
          square.topLeft,
          square.centerTop,
          square.centerBottom,
          square.bottomLeft
        );
        break;
      case 12:
        this.meshFromPoint(
          square.topLeft,
          square.topRight,
          square.centerRight,
          square.centerLeft
        );
        break;
      case 5:
        this.meshFromPoint(
          square.centerTop,
          square.topRight,
          square.centerRight,
          square.centerBottom,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      case 10:
        this.meshFromPoint(
          square.topLeft,
          square.centerTop,
          square.centerRight,
          square.bottomRight,
          square.centerBottom,
          square.centerLeft
        );
        break;

      // 3 active points cases
      case 7:
        this.meshFromPoint(
          square.centerTop,
          square.topRight,
          square.bottomRight,
          square.bottomLeft,
          square.centerLeft
        );
        break;
      case 11:
        this.meshFromPoint(
          square.topLeft,
          square.centerTop,
          square.centerRight,
          square.bottomRight,
          square.bottomLeft
        );
        break;
      case 13:
        this.meshFromPoint(
          square.topLeft,
          square.topRight,
          square.centerRight,
          square.centerBottom,
          square.bottomLeft
        );
        break;
      case 14:
        this.meshFromPoint(
          square.topLeft,
          square.topRight,
          square.bottomRight,
          square.centerBottom,
          square.centerLeft
        );
        break;

      // 4 active points cases
      case 15:
        this.meshFromPoint(
          square.topLeft,
          square.topRight,
          square.bottomRight,
          square.bottomLeft
        );
        this.checkedVertices.add(square.topLeft.vertexIndex);
        this.checkedVertices.add(square.topRight.vertexIndex);
        this.checkedVertices.add(square.bottomRight.vertexIndex);
        this.checkedVertices.add(square.bottomLeft.vertexIndex);
        break;
    }
  }

  show(p5: P5, darkMode: boolean, showMesh: boolean, showBorder: boolean) {
    this.mesh.show(p5, darkMode, showMesh);
    if (showBorder) this.wallMesh.show(p5, darkMode, false, 170);
  }
}
