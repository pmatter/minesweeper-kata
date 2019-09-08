
export class Cell {

  public static initial(x, y): Cell {
    return new Cell(x, y, 0, false);
  }

  constructor(public x: number,
              public y: number,
              public neighbourCount = 0,
              public isMine = false,
              public isOpen = false) {
  }

  increaseNeigbourCount() {
    this.neighbourCount++;
  }

  open() {
    this.isOpen = true;
  }
}
