import { Injectable, EventEmitter } from '@angular/core';
import { SERVER_URL, TOKEN_NAME } from '../app.constants';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { IUser } from '@isofocus/interfaces';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    logged = false;
    logged$: EventEmitter<boolean> = new EventEmitter<boolean>();
    SERVER_URL = SERVER_URL + '/auth/';

    constructor(private httpClient: HttpClient) { }

    private setLogged(logged: boolean, token = ''): boolean {
        this.logged = logged;
        if (logged && token) localStorage.setItem(TOKEN_NAME, token);
        else if (!logged) localStorage.removeItem(TOKEN_NAME);
        this.logged$.emit(logged);
        return logged;
    }

    login(credentials: { email: string, password: string }): Observable<boolean> {
        return this.anyLogin(this.SERVER_URL + 'login', credentials);
    }

    private anyLogin(url: string, data: any): Observable<boolean> {
        return this.httpClient
            .post(url, data)
            .map((response: any) => this.setLogged(true, response.token))
            .catch(error => Observable.throw(error.error));
    }

    isLogged(): Observable<boolean> {
        if (!this.logged && localStorage.getItem(TOKEN_NAME)) {
            return this.httpClient.get(this.SERVER_URL + 'token')
                .map(() => this.setLogged(true))
                .catch(() => Observable.of(false))
                .do(logged => this.setLogged(logged));
        }
        return Observable.of(this.logged);
    }

    register(user: IUser): Observable<boolean> {
        return this.httpClient
            .post(this.SERVER_URL + 'register', user)
            .map((response: any) => this.setLogged(true, response.token))
            .catch(error => Observable.throw(error));
    }

    logout(): void {
        localStorage.clear();
        this.setLogged(false);
    }

    getAuthorizationToken() {
        return `Bearer ${localStorage.getItem(TOKEN_NAME)}`;
    }
}
