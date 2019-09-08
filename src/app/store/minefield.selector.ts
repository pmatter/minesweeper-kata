import {Minefield} from '../minefield/minefield.class';
import {createSelector} from '@ngrx/store';

export enum STATE {
  ONGOING,
  LOST,
  WON
}

export interface FeatureState {
  minefield: Minefield;
  state: STATE;
}

export interface AppState {
  game: FeatureState;
}

export const selectMinefield = (state: AppState) => state.game.minefield;

export const selectGameState = (state: AppState) => state.game.state;

export const selectMineCount = createSelector(
  selectMinefield,
  (state: Minefield) => state.mines
);

export const selectOpenedCount = createSelector(
  selectMinefield,
  (state: Minefield) => state.revealed
);
