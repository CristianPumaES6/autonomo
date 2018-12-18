import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '@isofocus/interfaces';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'if-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    form: FormGroup;
    cols: number;
    id: number;
    user: IUser;
    fisrtTime = true;

    @ViewChild('htmlCardContent') htmlCardContent: HTMLElement | any;

    constructor(
        protected readonly profileService: ProfileService,
        protected readonly snack: MatSnackBar,
    ) { }

    ngOnInit() {
        this.profileService.getMy().subscribe(user => {
            this.user = user;
            this.createForm();
        });
    }

    createForm() {
        this.form = new FormGroup({
            name: new FormControl(this.user.name, [
                Validators.required,
            ]),
            phone: new FormControl(this.user.phone, [
                Validators.required,
            ]),
            email: new FormControl(this.user.email, [
                Validators.required,
            ]),
            address: new FormControl(this.user.address, [
                Validators.required,
            ]),
            dni: new FormControl(this.user.dni, [
                Validators.required,
            ]),
        });
        this.form.get('email').disable();
        this.form.valueChanges.debounceTime(1000).subscribe(() => !this.fisrtTime ? this.fisrtTime = !this.fisrtTime : this.editProfile());

        this.resize();
    }

    editProfile() {
        console.log('ENTRAAAA');
        this.profileService.putProfile(this.form.getRawValue()).subscribe(() => this.snack.open('Datos guardados con éxito', null, { duration: 5000 }));
    }

    resize() {
        if (this.htmlCardContent.nativeElement.offsetWidth < 767) this.cols = 12;
        else if (this.htmlCardContent.nativeElement.offsetWidth < 1025) this.cols = 6;
        else this.cols = undefined;
    }
}
