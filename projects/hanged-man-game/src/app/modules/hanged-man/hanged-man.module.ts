import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { RouterModule } from '@angular/router';
import { HangedManComponent } from './hanged-man.component';
import { HangedmanMainComponent } from './components/hanged-man/hanged-man.component';
import { HangedManRoutingModule } from './hanged-man-routing.module';
import { WordService } from './services/word.service';
import { GameService } from './services/game.service';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';

@NgModule({
  declarations: [
    HangedManComponent,
    MainViewComponent,
    HangedmanMainComponent,
    StopwatchComponent
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
