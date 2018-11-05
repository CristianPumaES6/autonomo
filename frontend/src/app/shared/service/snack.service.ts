import { Injectable, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackService {
    static sendError$: EventEmitter<any> = new EventEmitter<any>();
    constructor(private snackBar: MatSnackBar) { }
}
