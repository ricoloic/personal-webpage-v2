/* eslint-disable max-classes-per-file */
import P5 from 'p5';
import MeshGenerator from './meshGenerator';

class Coordinate {
  public tileX: number;

  public tileY: number;

  constructor(x: number, y: number) {
    this.tileX = x;
    this.tileY = y;
  }
}

class Room {
  public tiles: Coordinate[];

  public edgeTiles: Coordinate[];

  // eslint-disable-next-line no-use-before-define
  public connectedRooms: Room[];

  public roomSize: number;

  public isAccessibleFromMainRoom: boolean;

  public isMainRoom: boolean;

  constructor(tiles: Coordinate[], map: number[][]) {
    this.tiles = tiles;
    this.roomSize = tiles.length;
    this.connectedRooms = [];
    this.edgeTiles = [];
    this.isMainRoom = false;
    this.isAccessibleFromMainRoom = false;

    for (let i = 0; i < tiles.length; i += 1) {
      const tile = tiles[i];
      for (let x = tile.tileX - 1; x <= tile.tileX + 1; x += 1) {
        for (let y = tile.tileY - 1; y <= tile.tileY + 1; y += 1) {
          if (x === tile.tileX || y === tile.tileY) {
            if (map[x][y] === 1) {
              this.edgeTiles.push(tile);
            }
          }
        }
      }
    }
  }

  static emptyRoom() {
    return new Room([], []);
  }

  static connectRooms(roomA: Room, roomB: Room) {
    if (roomA.isAccessibleFromMainRoom) {
      roomB.setAccessibleFromMainRoom();
    } else if (roomB.isAccessibleFromMainRoom) {
      roomA.setAccessibleFromMainRoom();
    }

    roomA.connectedRooms.push(roomB);
    roomB.connectedRooms.push(roomA);
  }

  setAccessibleFromMainRoom() {
    if (!this.isAccessibleFromMainRoom) {
      this.isAccessibleFromMainRoom = true;

      for (let i = 0; i < this.connectedRooms.length; i += 1) {
        const connectedRoom = this.connectedRooms[i];
        connectedRoom.setAccessibleFromMainRoom();
      }
    }
  }

  isConnected(otherRoom: Room) {
    return this.connectedRooms.includes(otherRoom);
  }
}

export class MapGenerator {
  private readonly p5: P5;

  private readonly width: number;

  private readonly height: number;

  private readonly randomFillPercent: number;

  private map: number[][];

  private readonly seed: number;

  private readonly useRandomSeed: boolean;

  private scale: number;

  private meshGen: MeshGenerator;

  constructor(
    p5: P5,
    width: number,
    height: number,
    randomFillPercent: number,
    scale: number,
    numberOfPass = 5,
    seed = 0,
    useRandomSeed = true
  ) {
    this.p5 = p5;
    this.width = width;
    this.height = height;
    this.randomFillPercent = randomFillPercent;
    this.scale = scale;
    this.map = [];
    this.seed = seed;
    this.useRandomSeed = useRandomSeed;

    this.generateMap();
    this.randomFillMap();
    for (let i = 0; i < numberOfPass; i += 1) this.smoothMap();
    this.processMap();

    const borderSize = 1;
    const borderedMap: number[][] = [];
    borderedMap.length = this.width + borderSize * 2;
    for (let x = 0; x < borderedMap.length; x += 1) {
      borderedMap[x] = new Array(this.height + borderSize * 2);
      for (let y = 0; y < borderedMap[x].length; y += 1) {
        if (
          x >= borderSize &&
          x < this.width + borderSize &&
          y >= borderSize &&
          y < height + borderSize
        ) {
          borderedMap[x][y] = this.map[x - borderSize][y - borderSize];
        } else {
          borderedMap[x][y] = 1;
        }
      }
    }

    this.meshGen = new MeshGenerator(borderedMap, scale);
  }

  generateMap() {
    this.map.length = this.width;
    for (let x = 0; x < this.map.length; x += 1) {
      this.map[x] = new Array(this.height);
    }
  }

  processMap() {
    const wallRegions = this.getRegions(1);
    const wallThresholdSize = 50;

    for (let i = 0; i < wallRegions.length; i += 1) {
      const wallRegion = wallRegions[i];
      if (wallRegion.length < wallThresholdSize) {
        for (let j = 0; j < wallRegion.length; j += 1) {
          const tile = wallRegion[j];
          this.map[tile.tileX][tile.tileY] = 0;
        }
      }
    }

    const roomRegions = this.getRegions(0);
    const roomThresholdSize = 50;
    const survivingRooms: Room[] = [];

    for (let i = 0; i < roomRegions.length; i += 1) {
      const roomRegion = roomRegions[i];
      if (roomRegion.length < roomThresholdSize) {
        for (let j = 0; j < roomRegion.length; j += 1) {
          const tile = roomRegion[j];
          this.map[tile.tileX][tile.tileY] = 1;
        }
      } else {
        survivingRooms.push(new Room(roomRegion, this.map));
      }
    }

    if (survivingRooms.length === 0) return;

    survivingRooms.sort((a, b) => a.roomSize - b.roomSize);
    survivingRooms[0].isMainRoom = true;
    survivingRooms[0].isAccessibleFromMainRoom = true;
    this.connectClosestRooms(survivingRooms);
  }

  connectClosestRooms(
    allRooms: Room[],
    forceAccessibilityFromMainRoom = false
  ) {
    let roomListA: Room[] = [];
    let roomListB: Room[] = [];

    if (forceAccessibilityFromMainRoom) {
      for (let i = 0; i < allRooms.length; i += 1) {
        if (allRooms[i].isAccessibleFromMainRoom) {
          roomListB.push(allRooms[i]);
        } else {
          roomListA.push(allRooms[i]);
        }
      }
    } else {
      roomListA = allRooms;
      roomListB = allRooms;
    }

    let bestDistance = 0;
    let bestTileA = new Coordinate(0, 0);
    let bestTileB = new Coordinate(0, 0);
    let bestRoomA = Room.emptyRoom();
    let bestRoomB = Room.emptyRoom();
    let possibleConnectionFound = false;

    for (let i = 0; i < roomListA.length; i += 1) {
      const roomA = roomListA[i];

      if (!forceAccessibilityFromMainRoom) {
        possibleConnectionFound = false;
        // eslint-disable-next-line no-continue
        if (roomA.connectedRooms.length > 0) continue;
      }

      for (let j = 0; j < roomListB.length; j += 1) {
        const roomB = roomListB[j];
        // eslint-disable-next-line no-continue
        if (roomA === roomB || roomA.isConnected(roomB)) continue;

        for (
          let tileIndexA = 0;
          tileIndexA < roomA.edgeTiles.length;
          tileIndexA += 1
        ) {
          for (
            let tileIndexB = 0;
            tileIndexB < roomB.edgeTiles.length;
            tileIndexB += 1
          ) {
            const tileA = roomA.edgeTiles[tileIndexA];
            const tileB = roomB.edgeTiles[tileIndexB];
            const distanceBetweenRooms =
              (tileA.tileX - tileB.tileX) ** 2 +
              (tileA.tileY - tileB.tileY) ** 2;

            if (
              distanceBetweenRooms < bestDistance ||
              !possibleConnectionFound
            ) {
              possibleConnectionFound = true;
              bestDistance = distanceBetweenRooms;
              bestTileA = tileA;
              bestTileB = tileB;
              bestRoomA = roomA;
              bestRoomB = roomB;
            }
          }
        }
      }

      if (possibleConnectionFound && !forceAccessibilityFromMainRoom) {
        this.createPassage(bestRoomA, bestRoomB, bestTileA, bestTileB);
      }
    }

    if (possibleConnectionFound && forceAccessibilityFromMainRoom) {
      this.createPassage(bestRoomA, bestRoomB, bestTileA, bestTileB);
      this.connectClosestRooms(allRooms, true);
    }

    if (!forceAccessibilityFromMainRoom) {
      this.connectClosestRooms(allRooms, true);
    }
  }

  createPassage(
    roomA: Room,
    roomB: Room,
    tileA: Coordinate,
    tileB: Coordinate
  ) {
    Room.connectRooms(roomA, roomB);
    const line = MapGenerator.getLine(tileA, tileB);

    for (let i = 0; i < line.length; i += 1) {
      this.drawCircle(line[i], 2);
    }
  }

  drawCircle(coord: Coordinate, radius: number) {
    for (let x = -radius; x <= radius; x += 1) {
      for (let y = -radius; y <= radius; y += 1) {
        if (x * x + y * y <= radius * radius) {
          const drawX = coord.tileX + x;
          const drawY = coord.tileY + y;
          if (this.isInMapRange(drawX, drawY)) {
            this.map[drawX][drawY] = 0;
          }
        }
      }
    }
  }

  static getLine(from: Coordinate, to: Coordinate) {
    const line: Coordinate[] = [];

    let x = from.tileX;
    let y = from.tileY;

    const dx = to.tileX - from.tileX;
    const dy = to.tileY - from.tileY;

    let inverted = false;
    let step = dx < 0 ? -1 : 1;
    let gradientStep = dy < 0 ? -1 : 1;

    let longest = Math.abs(dx);
    let shortest = Math.abs(dy);

    if (longest < shortest) {
      inverted = true;
      longest = Math.abs(dy);
      shortest = Math.abs(dx);

      step = dy < 0 ? -1 : 1;
      gradientStep = dx < 0 ? -1 : 1;
    }

    let gradientAccumulation = longest / 2;

    for (let i = 0; i < longest; i += 1) {
      line.push(new Coordinate(x, y));

      if (inverted) {
        y += step;
      } else {
        x += step;
      }

      gradientAccumulation += shortest;
      if (gradientAccumulation >= longest) {
        if (inverted) {
          x += gradientStep;
        } else {
          y += gradientStep;
        }
        gradientAccumulation -= longest;
      }
    }

    return line;
  }

  getRegions(tileType: number) {
    const regions: Coordinate[][] = [];
    const mapFlags = this.createMapFlags();

    for (let x = 0; x < this.width; x += 1) {
      for (let y = 0; y < this.height; y += 1) {
        if (mapFlags[x][y] === 0 && this.map[x][y] === tileType) {
          const newRegion = this.getRegionTiles(x, y);
          regions.push(newRegion);

          for (let i = 0; i < newRegion.length; i += 1) {
            mapFlags[newRegion[i].tileX][newRegion[i].tileY] = 1;
          }
        }
      }
    }

    return regions;
  }

  getRegionTiles(startX: number, startY: number) {
    const tiles: Coordinate[] = [];
    const tileType = this.map[startX][startY];
    const mapFlags = this.createMapFlags();

    const queue: Coordinate[] = [];
    queue.push(new Coordinate(startX, startY));
    mapFlags[startX][startY] = 1;
    while (queue.length > 0) {
      const tile = queue.splice(0, 1)[0];
      tiles.push(tile);

      for (let x = tile.tileX - 1; x <= tile.tileX + 1; x += 1) {
        for (let y = tile.tileY - 1; y <= tile.tileY + 1; y += 1) {
          if (
            this.isInMapRange(x, y) &&
            (y === tile.tileY || x === tile.tileX)
          ) {
            if (mapFlags[x][y] === 0 && this.map[x][y] === tileType) {
              mapFlags[x][y] = 1;
              queue.push(new Coordinate(x, y));
            }
          }
        }
      }
    }

    return tiles;
  }

  createMapFlags() {
    const mapFlags: number[][] = [];
    mapFlags.length = this.width;
    for (let x = 0; x < mapFlags.length; x += 1) {
      mapFlags[x] = new Array(this.height);
      for (let y = 0; y < mapFlags[x].length; y += 1) {
        mapFlags[x][y] = 0;
      }
    }
    return mapFlags;
  }

  isInMapRange(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
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
        if (this.isInMapRange(neighbourX, neighbourY)) {
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

  show(darkMode: boolean, showMesh: boolean, showBorder: boolean) {
    this.meshGen.show(this.p5, darkMode, showMesh, showBorder);
  }
}

export default MapGenerator;
