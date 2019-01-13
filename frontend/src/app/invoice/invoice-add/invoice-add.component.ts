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

    constructor(
        protected readonly invoiceService: InvoiceService,
        protected readonly configService: ConfigService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) { }

    ngOnInit() {
        this.invoiceService.createForm().createStyle().addLine();
        this.invoiceService.getNext().subscribe(next => {
            this.nextID = next;
            this.invoiceService.form.get('visualID').setValue(+next);
        });

        // SET THE DEFAULT VALUE, AND CHANGE WHEN IT CHANGES
        // this.configService.getMy().subscribe(config => {
        // this.invoiceService.invoiceLinesForm.get('iva').setValue(this.invoiceService.invoiceLinesForm.get('received').value ? config.ivaDefaultReceived : config.ivaDefaultSent);
        // this.invoiceService.invoiceLinesForm.get('received').valueChanges.subscribe(received => this.invoiceService.invoiceLinesForm.get('iva').setValue(received ? config.ivaDefaultReceived : config.ivaDefaultSent));
        // });
    };

    addLine() {
        this.invoiceService.addLine();
    }

    create() {
        console.log(this.invoiceService.form.getRawValue());
        console.log(this.invoiceService.invoiceLinesForm.map(e => e.getRawValue()));
        // this.invoiceService.post(this.invoiceService.form.getRawValue() as IInvoice).subscribe(() => {
        //     localStorage.setItem('cif', this.invoiceService.form.get('cif').value);
        //     localStorage.setItem('nameCompany', this.invoiceService.form.get('nameCompany').value);
        //     localStorage.setItem('fisicalAddress', this.invoiceService.form.get('fisicalAddress').value);
        //     this.goBack();
        // });
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }
}
