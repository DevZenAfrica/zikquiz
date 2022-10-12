import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Observable} from 'rxjs';
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _trans: TranslateService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem(environment.key_token);
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          "X-localization": this._trans.currentLang || 'fr'
        }
      });
    }
    return next.handle(request);
  }
}
