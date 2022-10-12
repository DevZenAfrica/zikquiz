import { ModalWhatsAppComponent } from './core/_components/modal-whats-app/modal-whats-app.component';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './main/home/home.component';
import {ApiService} from "./core/_services/api.service";
import {environment} from "../environments/environment";
import {HowItWorkComponent} from "./main/how-it-work/how-it-work.component";
import {InviteFriendsComponent} from './main/invite-friends/invite-friends.component';
import {SuggestQuestionComponent} from './main/suggest-question/suggest-question.component';
import {ScoreComponent} from './main/score/score.component';
import {RankComponent} from './main/rank/rank.component';
import {NewGameComponent} from './main/new-game/new-game.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {ShareModule} from "@ngx-share/core";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {NgxSpinnerModule} from "ngx-spinner";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {NgCircleProgressModule} from "ng-circle-progress";
import {LoginComponent} from './main/auth/login/login.component';
import {JwtModule} from "@auth0/angular-jwt";
import {JwtInterceptor} from "./core/_helpers/jwt.interceptor";
import {OwlModule} from "ngx-owl-carousel";
import {ProfileComponent} from './main/auth/profile/profile.component';
import {UiSwitchModule} from "ngx-ui-switch";
import {ImageCropperModule} from "ngx-image-cropper";
import {TooltipModule} from "ng2-tooltip-directive";
import {RECAPTCHA_LANGUAGE, RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

registerLocaleData(localeFr, 'fr');

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json?v10');
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent, HowItWorkComponent, InviteFriendsComponent,
    SuggestQuestionComponent, ScoreComponent, RankComponent, NewGameComponent, LoginComponent, ProfileComponent, ModalWhatsAppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ShareModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    NgCircleProgressModule.forRoot(/*{
      "space": -5,
      "outerStrokeWidth": 5,
      "outerStrokeColor": "#e2001a",
      "innerStrokeColor": "#ffffff",
      "innerStrokeWidth": 5,
      "imageHeight": 60,
      "imageWidth": 60,
      "showImage": true,
      "showBackground": false,
      titleColor: '#000000',
      titleFontSize: '70',
      renderOnClick:false
    }*/),
    JwtModule.forRoot({
      config: {
        skipWhenExpired: true,
        tokenGetter,
        whitelistedDomains: [environment.api_url],
        blacklistedRoutes: [environment.api_url + '/api/auth/*']
      }
    }),
    OwlModule,
    TooltipModule,
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#87081e',
      switchColor: '#ffffff',
      //defaultBgColor: '#ffffff',
      defaultBoColor: '#87081e',
      checkedLabel: 'Oui',
      uncheckedLabel: 'Non',
      checkedTextColor: '#fff',
      uncheckedTextColor: '#000'
    }),
    ImageCropperModule,
    RecaptchaV3Module,
    NgxIntlTelInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDialogModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr'
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'fr', // use French language
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'en', // use English language
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha_key
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private _api: ApiService, ) {
    this._api.register('data', ['data']);
    this._api.register('auth', ['auth']);
    //this._api.register('api_stats', ['', environment.api_stat]);
    this._api.register('others', ['', 'assets/']);
  }
}
