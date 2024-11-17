import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.scss']
})
export class StopwatchComponent implements OnInit{
  private startTime: number | null = null;
  private timer: any = null;
  public elapsedTime: number = 0;
  @Output() onClick = new EventEmitter();

  constructor() {

  }

  ngOnInit() {
    this.start();
  }

 start() {
    if (!this.timer) {
      this.startTime = this.startTime ?? Date.now() - this.elapsedTime;
      this.timer = setInterval(() => {
        this.elapsedTime = Date.now() - (this.startTime || 0);
      }, 10); // Odświeżanie co 10ms
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.startTime = null;
  }

  click() {
    this.reset();
    this.onClick.emit();
  }
}
