import {Component} from '@angular/core';
import {Cell} from './cell.class';

export enum STATE {
  ONGOING,
  LOST,
  WON
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  STATE = STATE;
  title = 'minesweeper';
  minefield: Cell[][];
  opened: number;
  state: STATE;
  mineCount: number;

  constructor() {
    this.start();
  }

  private start() {
    this.state = STATE.ONGOING;
    this.opened = 0;
    this.minefield = this.createMinefield(4, 4);
    this.minefield = this.placeMine(this.minefield);
    this.mineCount = this.countMines(this.minefield);
  }

  private placeMine(minefield: Cell[][]): Cell[][] {
    const x = Math.floor(Math.random() * 4);
    const y = Math.floor(Math.random() * 4);
    const mine = Cell.mine(x, y);
    minefield[x][y] = mine;
    this.neighbours(mine).forEach(c => c.increaseNeigbours());
    return minefield;
  }

  private neighbours(cell: Cell) {
    return this.findNeighbours(cell.x, cell.y, 0, 4 - 1);
  }

  private findNeighbours(x: number, y: number, lowerBoundary: number, upperBoundary: number): Cell[] {
    const neighbours = [];
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (this.skipSelf(i, x, j, y) &&
            this.withinRange(i, lowerBoundary, upperBoundary) &&
            this.withinRange(j, lowerBoundary, upperBoundary)) {
          neighbours.push(this.minefield[i][j]);
        }
      }
    }
    return neighbours;
  }

  private withinRange(i, lowerBoundary: number, upperBoundary: number) {
    return i > (lowerBoundary - 1) && i <= upperBoundary;
  }

  private createMinefield(x: number, y: number): Cell[][] {
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

  explode() {
    this.state = STATE.LOST;
  }

  open(cell: Cell) {
    this.opened++;
    this.openNeighbours(cell);
    if (this.opened === (4 * 4) - this.mineCount) {
      this.state = STATE.WON;
    }
  }

  private openNeighbours(cell: Cell) {
    this.neighbours(cell).forEach(c => {
      if (c.neighbourCount === 0 && !c.isOpen && !c.isMine) {
        c.open();
        this.opened++;
        this.openNeighbours(c);
      }
    });
  }

  private countMines(minefield: Cell[][]): number {
    const cells = minefield.reduce((x, y) => { x.push(... y); return x; }, []);
    return cells.filter(c => c.isMine).length;
  }


  private skipSelf(i: number, x: number, j: number, y: number): boolean {
    return !(i === x && j === y);
  }
}
