// src/app/hangman/hangman.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordService } from '../../services/word.service';
import { takeUntil, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit, OnDestroy {
  maskedWord: string = '';
  guessedLetters: string[] = [];
  isGameOver: boolean = false;
  isWin: boolean = false;
  words: string[] = [];
  word: string = '';
  unsubscribe$ = new Subject<void>();

  constructor(
    private wordService: WordService,
    private gameService: GameService) {}

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    this.getWords()
    this.updateMaskedWord();
    this.isGameOver = false;
    this.isWin = false;
  }

  guessLetter(letter: string) {
    if (this.isGameOver || this.guessedLetters.includes(letter)) return;

    this.guessedLetters.push(letter);
    const isCorrect = this.gameService.guess(letter);
    this.updateMaskedWord();

    if (!isCorrect && this.gameService.isGameOver()) {
      this.isGameOver = true;
    } else if (this.gameService.isWordGuessed()) {
      this.isGameOver = true;
      this.isWin = true;
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

  getWords(): void {
    this.wordService.getWords()
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data) => {
      const randomIndex = Math.floor(Math.random() * data.words.length);
      console.log('====================================');
      this.word = data.words[randomIndex];
      console.log("@@  data.words[randomIndex] ",  data.words[randomIndex] );
      console.log("@@  this.word ",  this.word );
      console.log("@@  this.words ",  this.words );
      console.log("@@  data.words ",  data.words );
      console.log("@@  randomIndex ",  randomIndex );
      console.log('====================================');
      this.gameService.initialize(this.word);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
