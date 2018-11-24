import { Component, OnInit } from '@angular/core';
import { SnackService } from './shared/service/snack.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor(private snack: MatSnackBar) { }

    ngOnInit() {
        SnackService.send$.subscribe((message: string) => this.snack.open(message, null, { duration: 5000 }));
    }

}
