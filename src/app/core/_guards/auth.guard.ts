import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private _auth: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean> | Promise<boolean> | boolean {
    const currentUser = this._auth.currentUserValue;
    this._auth.decode_token();
    if (this._auth.is_login()) {
      if (state.url.indexOf('connexion') > -1) {
        this.router.navigate(['accueil']);
        return false;
      } else {
        return true;
      }
    } else if (state.url.indexOf('connexion') > -1) {
      return true;
    }

    if (this._auth.api.current_lang.components)
      this._auth.api.toast.info(this._auth.api.current_lang.components.ask_connect);

    this.router.navigate(['/connexion'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
