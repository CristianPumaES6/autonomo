import { Component, OnInit, ViewChild } from '@angular/core';
import { ProfileService } from './profile.service';
import { FormGroup } from '@angular/forms';
import { IUser } from '@isofocus/interfaces';
import { MatSnackBar } from '@angular/material';
import { FormStyle } from '../form/classes/form-style';

@Component({
    selector: 'if-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    form: FormGroup;
    style: FormStyle;
    id: number;
    user: IUser;
    fisrtTime = true;

    @ViewChild('htmlCardContent') htmlCardContent: HTMLElement | any;

    constructor(
        protected readonly profileService: ProfileService,
        protected readonly snack: MatSnackBar,
    ) { }

    ngOnInit() {
        this.profileService.getMy().subscribe(
            user => {
                this.user = user;
                this.createForm();
            }
        );
    }

    createForm() {
        this.form = this.profileService.createForm(this.user);
        this.style = this.profileService.createStyle();
        this.form.get('email').disable();
        this.form.valueChanges.debounceTime(1000).subscribe(() => !this.fisrtTime ? this.fisrtTime = !this.fisrtTime : this.editProfile());
    }

    editProfile() {
        this.profileService.putProfile(this.form.getRawValue()).subscribe(() => this.snack.open('Datos guardados con éxito', null, { duration: 5000 }));
    }
}
