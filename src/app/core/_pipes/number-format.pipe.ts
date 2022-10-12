import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  constructor(private translateService: TranslateService, private decimalPipe: DecimalPipe) {
  }

  transform(input: any): any {
    //input = input.toString().replace(/,/gi, '');
    if (input && !isNaN(input)) {
      const fixed = 4;
      let data = input, numberFilter = '0', num_fixed = input.toString(), num_split = num_fixed.split('.');
      if (num_split.length > 1) {
        const split_part_one = num_split[1].length,
          input = Number(data.toFixed(split_part_one > 4 ? fixed : split_part_one));
        numberFilter = this.decimalPipe.transform(input, '1.0-2', this.translateService.currentLang);
      } else {
        numberFilter = this.decimalPipe.transform(data, '1.0-2', this.translateService.currentLang);
      }
      /*? numberFilter.toString()
        .replace(
          this.translateService.currentLang === 'en' ? /./g : /,/g,
          this.translateService.currentLang === 'en' ? ' ' : ',' ) : '0'*/
      return numberFilter;
    }
    return '0';
  }

}
