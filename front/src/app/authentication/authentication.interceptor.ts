import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        // Add header with the accessToken to the request
        const accessToken = localStorage.getItem('accessToken');
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${ accessToken }`
            }
        });
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401 || err.status === 403) {
                    this.router.navigateByUrl('/');
                }
                throw err;
            })
        );
    }
}
