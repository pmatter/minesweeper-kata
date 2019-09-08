import {Component, OnInit} from '@angular/core';
import {MinefieldService} from './minefield/minefield.service';
import {Cell} from './minefield/cell.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  minefield: Cell[][];

  constructor(private minefieldService: MinefieldService) {
  }

  ngOnInit(): void {
    this.start();
  }

  start() {
    this.minefield = this.minefieldService.createMinefield(4);
  }

}
