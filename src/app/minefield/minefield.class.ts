import {Cell} from '../cell.class';

export class Minefield {

  constructor(public field: Cell[][], public mineCount: number) {
  }

  private static placeMine(minefield: Cell[][]): Cell[][] {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);
    const mine = Cell.mine(x, y);
    minefield[x][y] = mine;
    this.neighbours(minefield, mine).forEach(c => c.increaseNeigbours());
    return minefield;
  }

  public static neighbours(field: Cell[][], cell: Cell) {
    return this.findNeighbours(field, cell.x, cell.y, 0, 4 - 1);
  }

  private static findNeighbours(field: Cell[][], x: number, y: number, lowerBoundary: number, upperBoundary: number): Cell[] {
    const neighbours = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (this.skipSelf(i, x, j, y) &&
          this.withinRange(i, lowerBoundary, upperBoundary) &&
          this.withinRange(j, lowerBoundary, upperBoundary)) {
          neighbours.push(field[i][j]);
        }
      }
    }
    return neighbours;
  }

  private static withinRange(i, lowerBoundary: number, upperBoundary: number) {
    return i > (lowerBoundary - 1) && i <= upperBoundary;
  }

  private static createMinefield(x: number, y: number): Cell[][] {
    const mineField = [];
    for (let i = 0; i < x; i++) {
      const row = [];
      for (let j = 0; j < y; j++) {
        row.push(Cell.initial(i, j));
      }
      mineField.push(row);
    }
    return mineField;
  }

  private static skipSelf(i: number, x: number, j: number, y: number): boolean {
    return !(i === x && j === y);
  }

  public static countMines(minefield: Cell[][]): number {
    const cells = minefield.reduce((x, y) => { x.push(... y); return x; }, []);
    return cells.filter(c => c.isMine).length;
  }

  static countOpened(minefield: Cell[][]) {
    const cells = minefield.reduce((x, y) => { x.push(... y); return x; }, []);
    return cells.filter(c => c.isOpen).length;
  }

  public static create(): Minefield {
    const field = this.createMinefield(4, 4);
    this.placeMine(field);

    return new Minefield(field, this.countMines(field));
  }

  static openNeighbours(cells: Cell[][], cell: Cell) {
    Minefield.neighbours(cells, cell).forEach(c => {
      if (c.neighbourCount === 0 && !c.isOpen && !c.isMine) {
        c.open();
        Minefield.openNeighbours(cells, c);
      }
    });
  }
}
