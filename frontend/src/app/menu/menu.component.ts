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
    protected logged: boolean;

    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.authService.logged$.subscribe(logged => this.logged = logged);
    }

    logout() {
        this.sidenav.close();
        this.logged = false;
        this.authService.logout();
        this.router.navigate(['/auth']);
    }
}
