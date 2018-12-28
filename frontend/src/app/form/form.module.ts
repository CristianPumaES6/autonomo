import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { MaterialModule } from '../shared/material.module';
import { KeysPipe } from './keys.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        FormComponent,
        KeysPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
    exports: [
        FormComponent,
        KeysPipe,
    ],
    providers: [
        KeysPipe,
    ],
})
export class IfFormModule { }
