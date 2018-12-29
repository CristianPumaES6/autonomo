import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent, dialogImageComponent } from './form.component';
import { MaterialModule } from '../shared/material.module';
import { KeysPipe } from './keys.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ng2-img-cropper';

@NgModule({
    declarations: [
        FormComponent,
        KeysPipe,
        dialogImageComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ImageCropperModule
    ],
    exports: [
        FormComponent,
        KeysPipe
    ],
    providers: [
        KeysPipe
    ],
    entryComponents: [
        dialogImageComponent,
    ]
})
export class IfFormModule { }
