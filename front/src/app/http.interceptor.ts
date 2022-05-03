import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SnackbarService } from './public/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

    constructor(
        private snackbar: SnackbarService,
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((err) => {
                    if (err.status === 401) {
                        this.router.navigate(['/authentication']);
                    }
                    this.snackbar.displayErrorMessage(err.error.message);
                    throw err;
                })
            );
    }


}
