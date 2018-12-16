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
    formRegister: FormGroup;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.formRegister = new FormGroup({
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
        let user = this.formRegister.getRawValue();

        if (user.password !== user.rePassword) SnackService.send$.emit('Las contraseñas deben coincidir.');
        else {
            this.authService.register(this.formRegister.getRawValue()).subscribe(() => {
                SnackService.send$.emit('Registrado con éxito.');
                this.router.navigate(['/']);
            });
        }
    }

    goBack() { this.router.navigate(['/auth']); }
}
