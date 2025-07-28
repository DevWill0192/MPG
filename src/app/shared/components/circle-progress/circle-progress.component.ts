// circle-progress.component.ts
import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-circle-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleProgressComponent implements OnChanges {
  @Input() progress: number = 0;
  @Input() size: number = 100;
  @Input() progressColor: string = '#4CAF50';
  @Input() backgroundColor: string = '#e0e0e0';
  @Input() textSize: number = 24;
  @Input() title: string = "Progress";
  @Input() customClass: string = '';

  circumference = 2 * Math.PI * 15.9155;
  dashOffset = this.circumference;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['progress']) {
      this.updateProgress();
    }
  }

  private updateProgress() {
    const progressNum = Number(this.progress);
    const clampedProgress = Math.min(Math.max(isNaN(progressNum) ? 0 : progressNum, 0), 100);
    const offset = this.circumference - ((clampedProgress / 100) * this.circumference);
    this.dashOffset = offset;
  }
}
