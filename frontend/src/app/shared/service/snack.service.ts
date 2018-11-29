import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SnackService {
    static send$: EventEmitter<string> = new EventEmitter<string>();
    constructor() { }
}
