import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'if-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    logged: boolean;
    dark = localStorage.getItem('dark') === 'true';

    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private readonly authService: AuthService, private readonly router: Router) { }

    ngOnInit() {
        this.authService.logged$.subscribe(logged => this.logged = logged);
    }

    logout() {
        this.sidenav.close();
        this.logged = false;
        this.authService.logout();
        this.router.navigate(['/auth']);
    }

    changeDarkMode() {
        this.dark = !this.dark;

        localStorage.setItem('dark', `${this.dark}`);
    }
}
