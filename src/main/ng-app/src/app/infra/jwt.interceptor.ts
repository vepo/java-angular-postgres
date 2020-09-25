import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, empty } from 'rxjs';

import { AuthenticationService } from '../auth/authentication.service';
import { catchError, retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authorizationService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const auth = this.authorizationService.authenticationValue;
        const isLoggedIn = auth && auth.token;
        const isApiUrl = request.url.startsWith("/rest");//environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
        }

        return next.handle(request)
            .pipe(catchError((error: HttpErrorResponse) => {
                if (this.router.url != '/login') {
                    if (error && error.status == 401) {
                        this.authorizationService.logout();
                        this.router.navigate(['login']);
                        return empty();
                    }
                }
                return throwError(error);
            }));
    }
}