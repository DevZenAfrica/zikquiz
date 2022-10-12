import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rank'
})
export class RankPipe implements PipeTransform {

  transform(value: number): string {
    let value_return = '';
    switch (value) {
      case 1:
        value_return = 'st';
        break;
      case 2:
        value_return = 'nd';
        break;
      case 3:
        value_return = 'rd';
        break;
      default:
        value_return = 'th';
        break;
    }
    return value_return;
  }
}
