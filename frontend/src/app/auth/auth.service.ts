import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@isofocus/interfaces';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    logged = false;
    logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
    SERVER_URL = '/auth';

    constructor(private httpClient: HttpClient) { }

    private setLogged(logged: boolean, token = ''): boolean {
        this.logged = logged;
        if (logged && token) localStorage.setItem(environment.token_name, token);
        else if (!logged) localStorage.removeItem(environment.token_name);
        this.logged$.emit(logged);
        return logged;
    }

    login(credentials: { email: string, password: string }) {
        return this.anyLogin(`${this.SERVER_URL}/login`, credentials);
    }

    private anyLogin(url: string, data: any) {
        return this.httpClient.post(url, data).pipe(
            map((response: any) => this.setLogged(true, response.token)),
            catchError(error => Observable.throw(error.error))
        );
    }

    isLogged() {
        if (!this.logged && localStorage.getItem(environment.token_name)) {
            return this.httpClient.get(`${this.SERVER_URL}/token`).pipe(
                map(() => this.setLogged(true)),
                catchError(() => of(false)),
                tap(logged => this.setLogged(logged)),
            );
        }
        return of(this.logged);
    }

    register(user: IUser) {
        return this.httpClient
            .post(`${this.SERVER_URL}/register`, user).pipe(
                map((response: any) => this.setLogged(true, response.token)),
                catchError(error => Observable.throw(error)),
            );
    }

    logout(): void {
        localStorage.clear();
        this.setLogged(false);
    }

    getAuthorizationToken() {
        return `Bearer ${localStorage.getItem(environment.token_name)}`;
    }
}
