import {createReducer, on} from '@ngrx/store';
import {restart, reveal} from './minefield.action';
import {Minefield} from '../minefield/minefield.class';
import {FeatureState, STATE} from './minefield.selector';
import * as _ from 'lodash';

function buildInitialState() {
  return {
    minefield: Minefield.create(),
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
    const cell = newState.minefield.reveal(x, y);
    if (cell.isMine) {
      newState.state = STATE.LOST;
      return newState;
    }
    if (newState.minefield.hasWon()) {
      newState.state = STATE.WON;
      return newState;
    }
    return newState;
  })
);
