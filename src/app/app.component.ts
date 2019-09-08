import {Component, OnInit} from '@angular/core';
import {Minefield} from './minefield/minefield.class';
import {MinefieldService} from './minefield/minefield.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mineField: Minefield;

  constructor(private minefieldService: MinefieldService) {
  }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.mineField = this.minefieldService.createMinefield(4);
  }

}
