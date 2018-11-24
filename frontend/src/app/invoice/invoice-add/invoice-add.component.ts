import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
    selector: 'app-invoice-add',
    templateUrl: './invoice-add.component.html',
    styleUrls: ['./invoice-add.component.scss']
})
export class InvoiceAddComponent implements OnInit {
    form: FormGroup;
    cols: number;

    @ViewChild('htmlForm') htmlForm: HTMLFormElement;

    constructor(
        protected invoiceService: InvoiceService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            id: new FormControl(),
            date: new FormControl(moment().format(), [
                Validators.required,
            ]),
            cif: new FormControl('', [
                Validators.required,
            ]),
            nameCompany: new FormControl('', [
                Validators.required,
            ]),
            fisicalAddress: new FormControl('', [
                Validators.required,
            ]),
            iva: new FormControl(21, [
                Validators.required,
            ]),
            price: new FormControl(0, [
                Validators.required,
            ]),
            observations: new FormControl(),
        });
        this.resize();
    };

    createInvoide() {
        if (this.form.valid)
            this.invoiceService.post(this.form.getRawValue()).subscribe(() => this.goBack());
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }

    resize() {
        if (this.htmlForm.nativeElement.offsetWidth < 767) this.cols = 12;
        else if (this.htmlForm.nativeElement.offsetWidth < 1025) this.cols = 6;
        else this.cols = undefined;
    }
}
