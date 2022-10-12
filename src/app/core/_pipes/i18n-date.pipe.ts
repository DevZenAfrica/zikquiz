import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'i18nDate'
})
export class I18nDatePipe implements PipeTransform {

  constructor(private translateService: TranslateService, private datePipe: DatePipe) {
  }

  transform(value: any, format?: any, lang?: string): any {
    if (value)
      return this.datePipe.transform(value, format, null, lang || this.translateService.currentLang);
  }
}
