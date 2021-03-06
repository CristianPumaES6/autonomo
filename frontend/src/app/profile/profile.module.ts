import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfigModule } from '../config/config.module';
import { IfFormModule } from '../form/form.module';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        ConfigModule,
        IfFormModule,
        RouterModule.forChild([
            { path: '', component: ProfileComponent },
        ]),
    ]
})
export class ProfileModule { }
