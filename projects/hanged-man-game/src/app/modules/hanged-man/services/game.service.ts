// src/app/game.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private word: string = '';
  private guessedLetters: Set<string> = new Set();
  private maxErrors = 6;
  private errors = 0;

  initialize(word: string) {
    this.word = word;
    this.guessedLetters.clear();
    this.errors = 0;
  }

  guess(letter: string): boolean {
    if (this.word.includes(letter)) {
      this.guessedLetters.add(letter);
      return true;
    } else {
      this.errors++;
      return false;
    }
  }

  getMaskedWord(): string {
    return this.word.split('').map(letter => this.guessedLetters.has(letter) ? letter : '_').join(' ');
  }

  isGameOver(): boolean {
    return this.errors >= this.maxErrors || this.isWordGuessed();
  }

  isWordGuessed(): boolean {
    return this.word.split('').every(letter => this.guessedLetters.has(letter));
  }

  getErrors(): number {
    return this.errors;
  }

  getMaxErrors(): number {
    return this.maxErrors;
  }
}
