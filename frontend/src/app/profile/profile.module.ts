import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: ProfileComponent },
        ]),
    ]
})
export class ProfileModule { }
