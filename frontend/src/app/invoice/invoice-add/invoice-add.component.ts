import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService } from '../../config/config.service';
import { FormStyle } from '../../form/classes/form-style';

@Component({
    selector: 'app-invoice-add',
    templateUrl: './invoice-add.component.html',
    styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
    form: FormGroup;
    style: FormStyle;
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
        this.form = this.invoiceService.createForm();
        this.style = this.invoiceService.createStyle();

        this.invoiceService.getNext().subscribe(next => {
            this.nextID = next;
            this.form.get('visualID').setValue(+next);
        });

        // SET THE DEFAULT VALUE, AND CHANGE WHEN IT CHANGES
        this.configService.getMy().subscribe(config => {
            this.form.get('iva').setValue(this.form.get('received').value ? config.ivaDefaultReceived : config.ivaDefaultSent);
            this.form.get('received').valueChanges.subscribe(received => this.form.get('iva').setValue(received ? config.ivaDefaultReceived : config.ivaDefaultSent));
        });
    };

    create() {
        this.invoiceService.post(this.form.getRawValue()).subscribe(() => {
            localStorage.setItem('cif', this.form.get('cif').value);
            localStorage.setItem('nameCompany', this.form.get('nameCompany').value);
            localStorage.setItem('fisicalAddress', this.form.get('fisicalAddress').value);
            this.goBack();
        });
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }
}
