import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from 'src/app/shared/service/snack.service';
import { IInvoice } from '@isofocus/interfaces';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
    form: FormGroup;
    invoice: IInvoice;
    cols: number;
    id: number;

    @ViewChild('htmlCardContent') htmlCardContent: HTMLElement | any;

    constructor(
        protected readonly invoiceService: InvoiceService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(param => {
            this.id = param.id;
            if (!this.id) {
                SnackService.send$.emit('Error al editar la facura.');
                this.goBack();
            }
            this.invoiceService.get(this.id).subscribe(
                invoice => {
                    this.invoice = invoice;
                    if (!this.invoice) {
                        SnackService.send$.emit('No tienes permisos para ver esta factura.');
                        this.goBack();
                    } else this.createForm();
                }
            );
        });
    };

    createForm() {
        this.form = new FormGroup({
            visualID: new FormControl(this.invoice.visualID, [
                Validators.required,
            ]),
            date: new FormControl(this.invoice.date, [
                Validators.required,
            ]),
            cif: new FormControl(this.invoice.cif, [
                Validators.required,
            ]),
            nameCompany: new FormControl(this.invoice.nameCompany, [
                Validators.required,
            ]),
            fisicalAddress: new FormControl(this.invoice.fisicalAddress, [
                Validators.required,
            ]),
            iva: new FormControl(this.invoice.iva, [
                Validators.required,
            ]),
            price: new FormControl(this.invoice.price, [
                Validators.required,
            ]),
            description: new FormControl(this.invoice.description),
            notes: new FormControl(this.invoice.notes),
            received: new FormControl(this.invoice.received),
        });
        this.resize();
    }

    createInvoide() {
        if (this.form.valid) this.invoiceService.put({ id: this.id, ...this.form.getRawValue() }).subscribe(() => {
            this.goBack();
            SnackService.send$.emit('Editado con exito.');
        });
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }

    resize() {
        if (this.htmlCardContent.nativeElement.offsetWidth < 767) this.cols = 12;
        else if (this.htmlCardContent.nativeElement.offsetWidth < 1025) this.cols = 6;
        else this.cols = undefined;
    }
}
