import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { HangedManComponent } from './hanged-man.component';
import { HangedManRoutingModule } from './hanged-man-routing.module';
import { HangmanComponent } from './components/hangman/hangman.component';
import { WordService } from './services/word.service';
import { GameService } from './services/game.service';

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
    WordService,
    GameService
  ]
})
export class HangedManModule { }
