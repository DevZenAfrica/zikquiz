import { TranslateModule } from '@ngx-translate/core';
import {NgModule} from '@angular/core';
import {I18nDatePipe} from './_pipes/i18n-date.pipe';
import {NumberFormatPipe} from './_pipes/number-format.pipe';
import {CommonModule, DatePipe, DecimalPipe} from '@angular/common';
import {EscapeHtmlPipe} from "./_pipes/keep-html.pipe";
import {OrderByPipe} from './_pipes/order-by.pipe';
import {ToastrModule} from "ngx-toastr";
import { ProgressBarCComponent } from './_components/progress-bar-c/progress-bar-c.component';
import { RankPipe } from './_pipes/rank.pipe';


@NgModule({
  declarations: [I18nDatePipe, NumberFormatPipe, EscapeHtmlPipe, OrderByPipe, ProgressBarCComponent, RankPipe],
  imports: [
    CommonModule,
    TranslateModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      autoDismiss: false,
      enableHtml: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      newestOnTop: true,
      maxOpened: 2
    }),
  ],
  exports: [I18nDatePipe, NumberFormatPipe, EscapeHtmlPipe, OrderByPipe, RankPipe, ProgressBarCComponent],
  providers: [NumberFormatPipe, DecimalPipe, DatePipe]
})
export class CoreModule {
}
