import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'if-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    formLogin: FormGroup;

    constructor(
        protected authService: AuthService,
        public snackBar: MatSnackBar,
        protected router: Router,
    ) { }

    ngOnInit() {
        this.formLogin = new FormGroup({
            email: new FormControl('', [Validators.email, Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    login() {
        if (!this.formLogin.invalid) {
            this.authService
                .login(this.formLogin.getRawValue())
                .subscribe(() => this.router.navigate(['/']));
        }
    }
}
