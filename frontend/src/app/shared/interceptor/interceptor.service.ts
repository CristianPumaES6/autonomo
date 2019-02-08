import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { PROD, SERVER_URL } from '../../app.constants';
import { throwError } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SnackService } from '../service/snack.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor {

    constructor(private readonly authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.authService.getAuthorizationToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            url: SERVER_URL + req.url,
            headers: req.headers.set('Authorization', authToken),
        });

        return next.handle(authReq).pipe(
            tap((result: any) => {
                if (!PROD) {
                    console.log(`[ %c${req.method}`, 'color: red;', `]: ${req.url}`);
                    console.log('        %cREQUEST', 'color: yellow;', req.body || '');
                    console.log('        %cRESPONSE', 'color: green;', result.body || '');
                }
            }),
            catchError((error) => {
                if (!PROD) {
                    console.error(`[ %c${req.method}`, 'color: red;', `]: ${req.url}`);
                    console.log('        %cREQUEST', 'color: yellow;', req.body || '');
                    console.log('        %cERROR', 'color: red;', error.error);
                }
                SnackService.send$.emit(error.error.message);
                return throwError(error);
            })
        );
    }
}
