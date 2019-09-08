import {Injectable} from '@angular/core';
import {Minefield} from './minefield.class';

@Injectable({
  providedIn: 'root'
})
export class MinefieldService {

  constructor() { }

  public createMinefield(size: number = 4, chooseMine = (mineField: Minefield) => mineField.getRandomCell() ): Minefield {
    const field = Minefield.createMinefield(size);
    field.placeMine(chooseMine(field));
    return field;
  }
}
