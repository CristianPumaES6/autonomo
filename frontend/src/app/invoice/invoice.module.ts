import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceAddComponent } from './invoice-add/invoice-add.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IfFormModule } from '../form/form.module';

@NgModule({
    declarations: [InvoiceComponent, InvoiceEditComponent, InvoiceAddComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        IfFormModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: InvoiceComponent },
            { path: 'new', component: InvoiceAddComponent },
            { path: ':id', component: InvoiceEditComponent },
        ]),
    ]
})
export class InvoiceModule { }
