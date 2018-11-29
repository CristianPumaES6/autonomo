import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { PROD } from '../../app.constants';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../../auth/auth.service';
import { SnackService } from '../service/snack.service';

@Injectable()
export class Interceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        const authToken = this.authService.getAuthorizationToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });

        return next.handle(authReq)
            .do((result: any) => {
                if (!PROD) {
                    console.log(`[ %c${req.method}`, 'color: red;', `]: ${req.url}`);
                    console.log('        %cREQUEST', 'color: yellow;', req.body || '');
                    console.log('        %cRESPONSE', 'color: green;', result.body || '');
                }
            })
            .catch((error, caught) => {
                if (!PROD) {
                    console.error(`[ %c${req.method}`, 'color: red;', `]: ${req.url}`);
                    console.log('        %cREQUEST', 'color: yellow;', req.body || '');
                    console.log('        %cERROR', 'color: red;', error.error);
                }
                SnackService.send$.emit(error.error.error);
                return Observable.throw(error);
            }) as any;
    }
}
