import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { ApiService } from "./api.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { environment } from "../../../environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";

declare function getMsisdn(): any;
declare function getCountry(): any;
declare const globalUserName: any;
declare const avatarUser: any;

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  jwtHelper = new JwtHelperService();
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Subject<any> = new Subject<any>();
  public configuration: any = {};

  decodedToken: any;

  constructor(
    public api: ApiService,
    private _trans: TranslateService,
    public afAuth: AngularFireAuth
  ) {
    let value = localStorage.getItem(environment.key_user_data),
      user = value ? JSON.parse(value) : null,
      local_lang = localStorage.getItem(environment.key_lang_data);
    this.currentUserSubject = new BehaviorSubject<any>(user);
    console.log(user)
    if (user && user.lang.match(/en|fr/)) {
      this.api.current_lang_key = user.lang;
    } else if (local_lang && local_lang.match(/en|fr/)) {
      this.api.current_lang_key = local_lang;
    }
  }

  get windowRef() {
    return window;
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(credentials: any): Observable<any> {
    return Observable.create((observer) => {
      this.api.request("auth@post", "login", credentials).subscribe(
        (user: any) => {
          if (user && user.access_token) {
            localStorage.setItem(environment.key_token, user.access_token);
            localStorage.setItem(
              environment.key_user_data,
              JSON.stringify(user.user)
            );
            this.decodedToken = this.jwtHelper.decodeToken(user.access_token);
            this.api.current_lang_key = user.user.lang;
            this.currentUserSubject.next(user.user);
          }
          observer.next(user);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  doFacebookLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.FacebookAuthProvider();
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          console.log(res);
          resolve(res);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      this.afAuth.signInWithPopup(provider).then(
        (res) => {
          console.log(res);
          resolve(res.user);
        },
        (err) => {
          console.log(err);
          reject(err);
        }
      );
    });
  }

  profile(object: any, status: boolean = false): Observable<any> {
    return Observable.create((observer) => {
      this.api.request("auth@post", "update_profile", object).subscribe(
        (data: any) => {
          if (status) {
            this.login({
              link_key: this.currentUserValue.reference_code,
            }).subscribe();
            this.change_language(object.lang);
          }
          observer.next(data);
          observer.complete();
        },
        (error) => observer.error(error)
      );
    });
  }

  logout(): Observable<any> {
    return Observable.create((observer) => {
      this.logoutIntercept();
      observer.next(true);
      observer.complete();
    });
  }

  is_login(): boolean {
    const token = localStorage.getItem(environment.key_token);
    return !this.jwtHelper.isTokenExpired(token);
  }
  /*
  is_login(): boolean {
    const token = localStorage.getItem(environment.key_token);
    if(this.jwtHelper.isTokenExpired(token)) {
      if(getMsisdn()) {
        this.login({
          phone: getMsisdn(),
          code: null,
          recaptcha: null,
          countryCode: getCountry().toLowerCase(),
          dialCode: getMsisdn(),
          ref_parent: localStorage.getItem("key_parain_code")
        })
        .subscribe(
          (data) => {
            return true;
          },
          (err) => {
            return false;
            console.log(err);
          }
        );
      } else {  console.log('sort 4');
        return false;
      }
    } else {  console.log('entre 5');
      return true;
    }
    //return !this.jwtHelper.isTokenExpired(token);
  }
*/
  change_language(lang: string, up_status: boolean = false) {
    if (lang && lang.match(/en|fr/)) {
      this._trans.use(lang).subscribe((languages) => {
        this.api.current_lang = languages;
        this.api.current_lang_key = lang;
        localStorage.setItem(environment.key_lang_data, lang);
        if (this.currentUserValue) {
          const user = this.currentUserValue;
          user.lang = lang;
          this.currentUserSubject.next(user);
          localStorage.setItem(environment.key_user_data, JSON.stringify(user));
          if (up_status) this.profile(user).subscribe();
        }
      });
    }
  }

  decode_token() {
    const token = localStorage.getItem(environment.key_token);
    if (token) {
      this.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  logoutIntercept() {
    //this.cookieS.delete(this.key_cookie);
    localStorage.removeItem(environment.key_token);
    localStorage.removeItem(environment.key_user_data);
    this.currentUserSubject.next(null);
    this.currentUser.next(null);
  }
}
