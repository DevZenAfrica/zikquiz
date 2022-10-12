import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckTokenGuard implements CanActivate {

  constructor(private router: Router,
              private _auth: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const token = state.root.queryParamMap.get('r') || state.root.queryParamMap.get('ref');
    const key_parain = state.root.queryParamMap.get('p');

    if(key_parain){
      console.log(key_parain);
      localStorage.setItem('key_parain_code', key_parain);
    }

    if (token) {
      this._auth.api.is_loader(true);
      return this._auth.login({link_key: token}).pipe(
        map((data: any) => {
          if (data) {
            this._auth.api.is_loader(false);
            this.router.navigate(['nouveau-jeu']);
            return true;
          } else {
            this._auth.api.is_loader(false);
            return true;
          }
        }),
        catchError((err) => {
          this._auth.api.is_loader(false);
          return of(true);
        })
      );
    } else if (state.url.indexOf('login') > -1) {
      return true;
    }
    return true;
  }
}
