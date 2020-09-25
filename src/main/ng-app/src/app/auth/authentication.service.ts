import { Injectable, Optional } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { Authentication } from './authentication';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private jwtHelper: JwtHelperService = new JwtHelperService();
  private authSubject: BehaviorSubject<Authentication>;
  public auth: Observable<Authentication>;

  constructor(private http: HttpClient) {
    this.authSubject = new BehaviorSubject<Authentication>(JSON.parse(localStorage.getItem('authentication')));
    this.auth = this.authSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    return this.authSubject.value ? true : false;
  }

  public get authenticationValue(): Authentication {
    return this.authSubject.value;
  }

  public getTokenDetails(): any {
    let authentication = localStorage.getItem('authentication');
    if (authentication) {
      return this.jwtHelper.decodeToken(JSON.parse(authentication).token);
    }
    return null;
  }

  public hasRole(expectedRole: string): boolean {
    let authentication = localStorage.getItem('authentication');
    if (authentication) {
      return this.jwtHelper.decodeToken(JSON.parse(authentication).token).groups.indexOf(expectedRole) >= 0;
    }
    return false;
  }

  public static retrieveAuthentication(): Authentication {
    return JSON.parse(localStorage.getItem('authentication'));
  }

  public static cleanAuthentication(): void {
    localStorage.removeItem("authentication");
  }

  public static storeAuthentication(auth: Authentication): void {
    if (auth) {
      localStorage.setItem("authentication", JSON.stringify(auth));
    } else {
      localStorage.removeItem("authentication");
    }
  }

  public logout(): void {
    this.authSubject.next(null);
    AuthenticationService.cleanAuthentication();
  }

  public login(username: string, password: string): Observable<Authentication> {
    return new Observable<Authentication>(subscriber =>
      this.http.post<Authentication>('/rest/login', { username, password })
        .subscribe(
          authentication => {
            this.authSubject.next(authentication);
            AuthenticationService.storeAuthentication(authentication);
            subscriber.next(authentication);
            subscriber.complete();
          },
          error => subscriber.error(error)));
  }

}
