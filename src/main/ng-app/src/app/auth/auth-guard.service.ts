import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(public auth: AuthenticationService, public router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
