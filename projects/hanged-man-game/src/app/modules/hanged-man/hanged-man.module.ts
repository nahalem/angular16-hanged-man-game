import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { HangedManComponent } from './hanged-man.component';
import { HangedManRoutingModule } from './hanged-man-routing.module';
import { HangmanComponent } from './components/hangman/hangman.component';

@NgModule({
  declarations: [
    HangedManComponent,
    MainViewComponent,
    HangmanComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    HangedManRoutingModule,
  ],
  providers: [
  ]
})
export class HangedManModule { }
