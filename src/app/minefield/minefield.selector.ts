import {Cell} from '../cell.class';
import {Minefield} from './minefield.class';
import {createSelector} from '@ngrx/store';

export enum STATE {
  ONGOING,
  LOST,
  WON
}

export interface FeatureState {
  cells: Cell[][];
  state: STATE;
}

export interface AppState {
  game: FeatureState;
}

export const selectCells = (state: AppState) => state.game.cells;

export const selectGameState = (state: AppState) => state.game.state;

export const selectMineCount = createSelector(
  selectCells,
  (state: Cell[][]) => Minefield.countMines(state)
);

export const selectOpenedCount = createSelector(
  selectCells,
  (state: Cell[][]) => Minefield.countOpened(state)
);
