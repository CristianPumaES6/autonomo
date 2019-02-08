import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';
import { FormStyle } from '../../form/classes/form-style';
import { IInvoice } from '@isofocus/interfaces';

@Component({
    selector: 'app-invoice-add',
    templateUrl: './invoice-add.component.html',
    styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
    cols: number;
    validID = true;
    nextID: number;

    form: FormGroup;
    style: FormStyle;
    invoiceLinesStyles: FormStyle[] = [];
    invoiceLinesForm: FormGroup[] = [];


    constructor(
        protected readonly invoiceService: InvoiceService,
        protected readonly configService: ConfigService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) { }

    ngOnInit() {
        this.form = this.invoiceService.createForm();
        this.style = this.invoiceService.createStyle();
        this.invoiceLinesForm = [this.invoiceService.getFormLine()];
        this.invoiceLinesStyles = [this.invoiceService.getFormStyle()];

        this.invoiceService.getNext().subscribe(next => {
            this.nextID = next;
            this.form.get('visualID').setValue(+next);
        });
    };

    create() {
        if (this.form.valid) {
            const invoice: IInvoice = this.form.getRawValue();
            console.log(this.invoiceLinesForm.map(il => il.getRawValue()));
            invoice.invoiceLines = this.invoiceLinesForm.map(il => il.getRawValue());

            this.invoiceService.post(invoice).subscribe(() => {
                localStorage.setItem('cif', this.form.get('cif').value);
                localStorage.setItem('nameCompany', this.form.get('nameCompany').value);
                localStorage.setItem('fisicalAddress', this.form.get('fisicalAddress').value);
                this.goBack();
            });
        }
    }

    addLine() {
        this.invoiceLinesForm.push(this.invoiceService.getFormLine());
        this.invoiceLinesStyles.push(this.invoiceService.getFormStyle());
    }

    deleteLine() {
        if (this.invoiceLinesForm.length > 1) {
            this.invoiceLinesForm.pop();
            this.invoiceLinesStyles.pop();
        }
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }
}

// SET THE DEFAULT VALUE, AND CHANGE WHEN IT CHANGES
// this.configService.getMy().subscribe(config => {
// this.form.get('iva').setValue(this.form.get('received').value ? config.ivaDefaultReceived : config.ivaDefaultSent);
// this.form.get('received').valueChanges.subscribe(received => this.form.get('iva').setValue(received ? config.ivaDefaultReceived : config.ivaDefaultSent));
// });



