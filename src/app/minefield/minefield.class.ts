import {Cell} from './cell.class';

export class Minefield {

  constructor(public field: Cell[][], private size: number) {
  }

  public get mines(): number {
    const cells = this.field.reduce((x, y) => { x.push(... y); return x; }, []);
    return cells.filter(c => c.isMine).length;
  }

  public get revealed(): number {
    const cells = this.field.reduce((x, y) => { x.push(... y); return x; }, []);
    return cells.filter(c => c.isOpen).length;
  }

  public get hasWon(): boolean {
    return this.revealed === (this.size * this.size) - this.mines;
  }

  static createMinefield(size: number): Minefield {
    const mineField = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(Cell.initial(i, j));
      }
      mineField.push(row);
    }
    return new Minefield(mineField, size );
  }

  static create(size: number = 4, chooseMine = (mineField: Minefield) => mineField.getRandomCell() ): Minefield {
    const field = Minefield.createMinefield(size);
    field.placeMine(chooseMine(field));
    return field;
  }

  public reveal(x: number, y: number): Cell {
    const cell = this.field[x][y];
    this.revealNeighbours(cell);
    cell.open();
    return cell;
  }

  public placeMine(cell: Cell): void {
    cell.isMine = true ;
    this.findNeighbours(cell).forEach(c => c.increaseNeigbourCount());
  }

  private revealNeighbours(cell: Cell) {
    this.findNeighbours(cell).forEach(c => {
      if (c.neighbourCount === 0 && !c.isOpen && !c.isMine) {
        c.open();
        this.revealNeighbours(c);
      }
    });
  }

  private findNeighbours(cell: Cell): Cell[] {
    const neighbours = [];
    for (let i = cell.x - 1; i <= cell.x + 1; i++) {
      for (let j = cell.y - 1; j <= cell.y + 1; j++) {
        if (this.skipSelf(i, cell.x, j, cell.y) &&
          this.withinRange(i) &&
          this.withinRange(j)) {
          neighbours.push(this.field[i][j]);
        }
      }
    }
    return neighbours;
  }

  private skipSelf(i: number, x: number, j: number, y: number): boolean {
    return !(i === x && j === y);
  }

  private withinRange(i) {
    return i >=  0 && i < this.size;
  }

  public getRandomCell(): Cell {
    return this.field
      [Math.floor(Math.random() * this.size)]
      [Math.floor(Math.random() * this.size)];
  }

}
