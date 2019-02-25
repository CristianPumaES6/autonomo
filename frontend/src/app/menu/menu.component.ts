import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../invoice/invoice.service';
import { ProfileService } from '../profile/profile.service';
import { AuthService } from '../auth/auth.service';
import { MatSidenav } from '@angular/material';
import { IUser } from '@isofocus/interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'if-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    dark = localStorage.getItem('dark') === 'true';
    logged: boolean;
    size: number;
    user: IUser;

    @ViewChild('sidenav') sidenav: MatSidenav;

    constructor(
        private readonly invoiceService: InvoiceService,
        private readonly profileService: ProfileService,
        private readonly authService: AuthService,
        private readonly router: Router,
    ) { }

    ngOnInit() {
        this.authService.logged$.subscribe((logged: boolean) => {
            this.logged = logged;
            if (this.logged) {
                this.invoiceService.getTotalSize().subscribe(size => this.size = size);
                this.profileService.getMy().subscribe(user => this.user = user);
            }
        });
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
