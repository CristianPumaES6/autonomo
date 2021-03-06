import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService<T> {
    protected SERVER_URL: string;
    constructor(protected readonly httpClient: HttpClient) { }

    get(): Observable<T[]>;
    get(id: number): Observable<T>;
    get(id?: number) {
        return this.httpClient.get<T | T[]>(`${this.SERVER_URL}/${id || ''}`);
    }

    restore(id: number) {
        return this.httpClient.get<T>(`${this.SERVER_URL}/restore/${id}`);
    }

    getTable() {
        return this.httpClient.get<T[]>(`${this.SERVER_URL}/table`);
    }

    post(data: T) {
        return this.httpClient.post<T>(this.SERVER_URL, data);
    }

    put(data: T) {
        return this.httpClient.put<T>(this.SERVER_URL, data);
    }

    delete(id: number) {
        return this.httpClient.delete<T>(`${this.SERVER_URL}/${id}`);
    }
}
