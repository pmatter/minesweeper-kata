import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import {StoreModule} from '@ngrx/store';
import {minefieldReducer} from './minefield/minefield.recuder';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ game: minefieldReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
