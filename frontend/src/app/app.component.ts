import { Component, OnInit } from '@angular/core';
import { SnackService } from './shared/service/snack.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'isofocus';

    constructor(private snack: MatSnackBar) { }

    ngOnInit() {
        SnackService.sendError$.subscribe(message => {
            this.snack.open(message, null, { duration: 5000 });
        });
    }

}
