// src/app/hangman/hangman.component.ts
import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { WordService } from '../../services/word.service';


@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.scss']
})
export class HangmanComponent implements OnInit {
  maskedWord: string = '';
  guessedLetters: string[] = [];
  isGameOver: boolean = false;
  isWin: boolean = false;

  constructor(
    private wordService: WordService,

    // belo make private and do something on html
    public gameService: GameService) {}

  ngOnInit() {
    this.startNewGame();
  }

  startNewGame() {
    const word = this.wordService.getRandomWord();
    this.gameService.initialize(word);
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
}
