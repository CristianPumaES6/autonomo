import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IfFormModule } from '../form/form.module';

@NgModule({
    declarations: [ConfigComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        IfFormModule,
    ],
    exports: [ConfigComponent]
})
export class ConfigModule { }
