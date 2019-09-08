import {createAction, props} from '@ngrx/store';
import {Cell} from '../minefield/cell.class';

export const reveal = createAction('[Minefield Component] reveal',  props<{ cell: Cell }>());
export const restart = createAction('[Minefield Component] restart');
