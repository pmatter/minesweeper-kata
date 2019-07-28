import {createReducer, on} from '@ngrx/store';
import {restart, reveal} from './minefield.action';
import {Minefield} from './minefield.class';
import {FeatureState, STATE} from './minefield.selector';
import * as _ from 'lodash';

function buildInitialState() {
  return {
    cells: Minefield.create().field,
    state: STATE.ONGOING,
  };
}

export const initialState: FeatureState =  buildInitialState();

export const minefieldReducer = createReducer(initialState,
  on(restart, () => {
    console.log('reduce restart event', initialState);
    return buildInitialState();
  }),
  on(reveal, (state: FeatureState, properties) => {
    console.log('reduce reveal event', properties);
    const newState: FeatureState = _.cloneDeep(state);
    const x = properties.cell.x;
    const y = properties.cell.y;
    const cell = newState.cells[x][y];
    if (cell.isMine) {
      newState.state = STATE.LOST;
      return newState;
    }
    cell.open();
    Minefield.openNeighbours(newState.cells, cell);
    if (Minefield.countOpened(newState.cells) === (4 * 4) - Minefield.countMines(state.cells)) {
      newState.state = STATE.WON;
    }
    return newState;
  }),
);
