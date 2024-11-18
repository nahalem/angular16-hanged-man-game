import { Component, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordService } from '../../services/word.service';
import { takeUntil, Subject } from 'rxjs';
import { StopwatchComponent } from '../stopwatch/stopwatch.component';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnDestroy {
  maskedWord: string = '';
  guessedLetters: string[] = [];
  isGameStarted: boolean = false;
  isGameOver: boolean = false;
  stagesCompleted: boolean = false;
  isWin: boolean = false;
  letters: string = 'abcdefghijklmnopqrstuvwxyz';
  words: string[] = [];
  word: string = '';
  stage: number = 1;
  maximumStages: number = 6;
  elapsedTime: number = 0;
  @ViewChild(StopwatchComponent, { static: true }) stopWatchComponent: StopwatchComponent = new StopwatchComponent;
  unsubscribe$ = new Subject<void>();

  constructor(
    private wordService: WordService,
    private gameService: GameService) {}

  ngAfterViewInit(){
    this.resetStopWatch();
  }

  startNewGame() {
    this.isGameStarted = true;
    this.gameService.reset();
    this.isGameOver = false;
    this.maskedWord = '';
    this.guessedLetters = [];
    this.getLetters();
    this.getWords()
    this.updateMaskedWord();

  }

  guessLetter(letter: string) {
    if (this.isGameOver || this.guessedLetters.includes(letter)){
       return
    };

    this.guessedLetters.push(letter);
    const isCorrect = this.gameService.guess(letter);
    this.updateMaskedWord();

    if (!isCorrect && this.gameService.isGameOver()) {
      this.isGameOver = true;
      this.isWin = false;
      this.stage = 1;
      this.resetStopWatch();
    } else if (this.gameService.isWordGuessed()) {
      this.isGameOver = true;
      this.isWin = true;
      this.stage++;
      this.elapsedTime = this.stopWatchComponent.elapsedTime;
      this.checkGameFinish();
    }
  }

  updateMaskedWord() {
    this.maskedWord = this.gameService.getMaskedWord();
  }

  getErrors(): number {
    return this.gameService.getErrors();
  }

  getMaxErrors(): number {
    return this.gameService.getMaxErrors();
  }

  getLetters(): string[] {
    return this.letters.split('');
  }

  getWords(): void {
    this.wordService.getWords()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.words.length);
      this.word = data.words[randomIndex];
      this.gameService.initialize(this.word);

      console.log('====================================');
      console.log("@@ this.word" , this.word);
      console.log('====================================');
    });
  }

  isGuessedLetters(letter: string) : Boolean {
    return this.guessedLetters.includes(letter)
  }

  private resetStopWatch(): void {
    this.stopWatchComponent.stop();
    this.stopWatchComponent.reset();
    this.stopWatchComponent.start();
  }

  private checkGameFinish() {
    if(this.stage === this.maximumStages) {
      this.stagesCompleted = true;
      this.stage = 1;
      alert('You finished the Game!!!');
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
