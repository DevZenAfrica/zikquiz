import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-progress-bar-c',
  templateUrl: './progress-bar-c.component.html',
  styleUrls: ['./progress-bar-c.component.scss']
})
export class ProgressBarCComponent {
  /** Inputs **/
  @Input('progress') progress: string;
  @Input('color') color: string;
  @Input('title') title: string;
  @Input('color-full') color_full: string;
  @Input('color-degraded') degraded: any;
  @Input('disable-percentage') disabledP: boolean;


  constructor() {
    // Default color
    this.color = "#488aff";
    this.title = "titre";
    this.color_full = "#f4f4f4";
    this.disabledP = false;
  }

  /**
   * Returns a color for a certain percent
   * @param percent The current progress
   */
  whichColor(percent: string) {
    // Get all entries index as an array
    let k: Array<any> = Object.keys(this.degraded);
    // Convert string to number
    k.forEach((e, i) => k[i] = +e);
    // Sort them by value
    k = k.sort((a, b) => a - b);
    // Percent as number
    let p = +percent;
    // Set last by default as the first occurrence
    let last = k[0];
    // Foreach keys
    for (let val of k) {
      // if current val is < than percent
      if (val < p) {
        last = val;
      }
      // if val >= percent then the val that we could show has been reached
      else if (val >= p - 1) {
        return this.degraded[last];
      }
    }
    // if its the last one return the last
    return this.degraded[last];
  }

  whichProgress(progress: string) {
    try {
      return Math.round(+progress * 100) / 100;
    } catch {
      return progress;
    }
  }

}
