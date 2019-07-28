
export class Cell {
  public static mine(x, y): Cell {
    return new Cell(x, y, 0, true);
  }

  public static initial(x, y): Cell {
    return new Cell(x, y, 0, false);
  }

  constructor(public x: number,
              public y: number,
              public neighbourCount = 0,
              public readonly isMine = false,
              public isOpen = false) {
  }

  increaseNeigbours() {
    this.neighbourCount++;
  }

  open() {
    this.isOpen = true;
  }
}
