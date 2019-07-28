import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cell} from '../cell.class';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit, DoCheck {

  @Input('cell') cell: Cell;
  @Output('onOpen') onOpen = new EventEmitter<Cell>();
  @Output('onExplode') onExplode = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    if (this.cell.isMine) {
      this.onExplode.emit();
    } else {
      if (!this.cell.isOpen) {
        this.cell.open();
        this.onOpen.emit(this.cell);
      } else {
        console.log('already open');

      }
    }
  }

  ngDoCheck(): void {
  }
}
