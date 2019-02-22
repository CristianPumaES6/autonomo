import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackService } from '../../shared/service/snack.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('', [
                Validators.required,
            ]),
            rePassword: new FormControl('', [
                Validators.required,
            ]),
            dni: new FormControl('', [
                Validators.required,
            ]),
            name: new FormControl('', [
                Validators.required,
            ]),
        });
    }

    register() {
        let user = this.form.getRawValue();

        if (user.password !== user.rePassword) SnackService.send$.emit('Las contraseñas deben coincidir.');
        else {
            if (this.form.valid)
                this.authService.register(this.form.getRawValue()).subscribe(() => {
                    SnackService.send$.emit('Registrado con éxito.');
                    this.router.navigate(['/']);
                });
        }
    }

    goBack() { this.router.navigate(['/auth']); }
}
