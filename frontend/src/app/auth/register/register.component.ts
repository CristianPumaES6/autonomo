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
            email: new FormControl('miguel@isofocus.es', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl('1234', [
                Validators.required,
            ]),
            rePassword: new FormControl('1234', [
                Validators.required,
            ]),
            dni: new FormControl('48778194R', [
                Validators.required,
            ]),
            name: new FormControl('Miguel Moya Ortega', [
                Validators.required,
            ]),
        });
    }

    register() {
        let user = this.formRegister.getRawValue();

        console.log(user)

        if (user.password !== user.rePassword) SnackService.send$.emit('Las contraseñas deben coincidir.');
        else {
            this.authService.register(this.formRegister.getRawValue()).subscribe(() => this.goBack());
        }
    }

    goBack() { this.router.navigate(['/'], { relativeTo: this.route }); }
}
