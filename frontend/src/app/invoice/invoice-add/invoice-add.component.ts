import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfigService } from '../../config/config.service';

@Component({
    selector: 'app-invoice-add',
    templateUrl: './invoice-add.component.html',
    styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
    form: FormGroup;
    cols: number;
    validID = true;

    @ViewChild('htmlForm') htmlForm: HTMLFormElement;

    constructor(
        protected invoiceService: InvoiceService,
        protected configService: ConfigService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            visualID: new FormControl('', [
                Validators.required,
            ], [
                    this.invoiceService.uniqueID(),
                ]
            ),
            date: new FormControl(moment().format(), [
                Validators.required,
            ]),
            cif: new FormControl(localStorage.getItem('cif') || '', [
                Validators.required,
            ]),
            nameCompany: new FormControl(localStorage.getItem('nameCompany') || '', [
                Validators.required,
            ]),
            fisicalAddress: new FormControl(localStorage.getItem('fisicalAddress') || '', [
                Validators.required,
            ]),
            iva: new FormControl(0, [
                Validators.required,
            ]),
            price: new FormControl(0, [
                Validators.required,
            ]),
            observations: new FormControl(),
            received: new FormControl(true),
        });
        this.invoiceService.getNext().subscribe(next => this.form.get('visualID').setValue(+next));

        // SET THE DEFAULT VALUE, AND CHANGE WHEN IT CHANGES
        this.configService.getMy().subscribe(config => {
            this.form.get('iva').setValue(this.form.get('received').value ? config.ivaDefaultReceived : config.ivaDefaultSent);
            this.form.get('received').valueChanges.subscribe(received => this.form.get('iva').setValue(received ? config.ivaDefaultReceived : config.ivaDefaultSent));
        });


        this.resize();
    };

    createInvoide() {
        this.invoiceService.post(this.form.getRawValue()).subscribe(() => {
            localStorage.setItem('cif', this.form.get('cif').value);
            localStorage.setItem('nameCompany', this.form.get('nameCompany').value);
            localStorage.setItem('fisicalAddress', this.form.get('fisicalAddress').value);
            this.goBack();
        });
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }

    resize() {
        if (this.htmlForm.nativeElement.offsetWidth < 767) this.cols = 12;
        else if (this.htmlForm.nativeElement.offsetWidth < 1025) this.cols = 6;
        else this.cols = undefined;
    }
}
