import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  userMenuExpanded: boolean;
  username: string;
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.userMenuExpanded = false;
    this.authenticationService.auth.subscribe(auth => {
      if (auth) {
        this.username = auth.username;
      } else {
        this.username = '';
      }
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(evnt => this.userMenuExpanded = false);
  }

  hasRole(role: string): boolean {
    return this.authenticationService.hasRole(role);
  }

  toggleUserMenu() {
    this.userMenuExpanded = !this.userMenuExpanded;
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return this.authenticationService.isAuthenticated();
  }

}
