import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  private apiUrl = 'http://localhost:3000/words';
  // private words = ['angular', 'typescript', 'programming', 'developer', 'framework', 'moniadupcia'];

  constructor(
    private http: HttpClient
  ) {}

  // getRandomWord(): string {
  //   const randomIndex = Math.floor(Math.random() * this.words.length);
  //   return this.words[randomIndex];
  // }

  getWords(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
