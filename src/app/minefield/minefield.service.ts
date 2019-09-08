import {Injectable} from '@angular/core';
import {Cell} from './cell.class';

@Injectable({
  providedIn: 'root'
})
export class MinefieldService {

  constructor() { }

  public createMinefield(size: number = 4): Cell[][] {
    const fields = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(new Cell(i, j));
      }
      fields.push(row);
    }
    this.getRandomCell(fields).isMine = true;
    return fields;
  }

  public getRandomCell(field: Cell[]): Cell {
    return field
      [Math.floor(Math.random() * field.length)]
      [Math.floor(Math.random() * field.length)];
  }

  /* Returns the adjacent cells of cell */
  public findNeighbours(field: Cell[][], cell: Cell): Cell[] {
    const neighbours = [];
    for (let i = cell.x - 1; i <= cell.x + 1; i++) {
      for (let j = cell.y - 1; j <= cell.y + 1; j++) {
        if (this.skipSelf(i, cell.x, j, cell.y) &&
          this.withinRange(i, field.length) &&
          this.withinRange(j, field.length)) {
          neighbours.push(field[i][j]);
        }
      }
    }
    return neighbours;
  }

  private skipSelf(i: number, x: number, j: number, y: number): boolean {
    return !(i === x && j === y);
  }

  private withinRange(i: number, size: number) {
    return i >=  0 && i < size;
  }

}
