import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InvoiceService } from '../invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackService } from 'src/app/shared/service/snack.service';
import { IInvoice } from '@isofocus/interfaces';
import { FormStyle } from '../../form/classes/form-style';

@Component({
    selector: 'app-invoice-edit',
    templateUrl: './invoice-edit.component.html',
    styleUrls: ['./invoice-edit.component.scss']
})
export class InvoiceEditComponent implements OnInit {
    form: FormGroup;
    style: FormStyle;
    invoice: IInvoice;
    cols: number;
    id: number;

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
                    } else {
                        this.form = this.invoiceService.createForm(this.invoice);
                        this.style = this.invoiceService.createStyle();
                    }
                }
            );
        });
    };

    edit() {
        if (this.form.valid) this.invoiceService.put({ id: this.id, ...this.form.getRawValue() }).subscribe(() => {
            this.goBack();
            SnackService.send$.emit('Editado con exito.');
        });
    }

    goBack() { this.router.navigate(['..'], { relativeTo: this.route }); }
}
