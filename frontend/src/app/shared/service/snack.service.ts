import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SnackService {
    static send$: EventEmitter<any> = new EventEmitter<any>();
    constructor() { }
}
