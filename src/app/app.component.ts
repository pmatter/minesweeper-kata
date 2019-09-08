import {Component, OnInit} from '@angular/core';
import {Cell} from './minefield/cell.class';
import {Store} from '@ngrx/store';
import {restart, reveal} from './store/minefield.action';
import {
  AppState,
  selectGameState,
  selectMineCount,
  selectMinefield,
  STATE
} from './store/minefield.selector';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  STATE = STATE;
  title = 'minesweeper';
  mineField: Observable<Cell[][]>;
  mineCount: Observable<number>;
  state: Observable<STATE>;

  constructor(private store: Store<AppState>) {
  }

  open(c: Cell) {
    this.store.dispatch(reveal({cell: c}));
  }

  ngOnInit(): void {
    this.mineField = this.store.select(selectMinefield).pipe(
      map(m => m.field)
    );
    this.mineCount = this.store.select(selectMineCount);
    this.state =  this.store.select(selectGameState);
  }

  start() {
    this.store.dispatch(restart());
  }
}
