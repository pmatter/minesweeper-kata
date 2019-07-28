import {Component, OnInit} from '@angular/core';
import {Cell} from './cell.class';
import {Store} from '@ngrx/store';
import {restart, reveal} from './minefield/minefield.action';
import {AppState, selectCells, selectGameState, selectMineCount, selectOpenedCount, STATE} from './minefield/minefield.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  STATE = STATE;
  title = 'minesweeper';
  mineFieldCells: Observable<Cell[][]>;
  mineCount: Observable<number>;
  state: Observable<STATE>;

  constructor(private store: Store<AppState>) {
  }

  open(c: Cell) {
    this.store.dispatch(reveal({cell: c}));
  }

  ngOnInit(): void {
    this.mineFieldCells = this.store.select(selectCells);
    this.mineCount = this.store.select(selectMineCount);
    this.state =  this.store.select(selectGameState);
  }

  start() {
    this.store.dispatch(restart());
  }
}
