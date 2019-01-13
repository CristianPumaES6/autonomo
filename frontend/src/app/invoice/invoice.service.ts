import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IInvoice } from '@isofocus/interfaces';
import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, AbstractControl, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { FormStyle } from '../form/classes/form-style';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService<IInvoice> {
    public style: FormStyle;
    public form: FormGroup;
    public invoiceLinesStyles: FormStyle[] = [];
    public invoiceLinesForm: FormGroup[] = [];

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL += '/invoice/';
    }

    getCharts() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart');
    }

    getNext() {
        return this.httpClient.get<number>(this.SERVER_URL + 'next');
    }

    checkID(id: number) {
        return this.httpClient.get<{ ok: boolean }>(this.SERVER_URL + 'check/' + id);
    }

    /**
     * VALIDATORS
     */
    uniqueID(): AsyncValidatorFn {
        return (control: AbstractControl) =>
            Observable.timer(750).switchMap(
                () => !isNaN(control.value) ? this.checkID(control.value).map(response => !response.ok ? { invalidID: true } : null) : null
            );
    }

    getPDF(id: number) {
        return this.httpClient.get(this.SERVER_URL + 'pdf/' + id);
    }

    createForm(invoice?: IInvoice) {
        this.form = new FormGroup({
            visualID: new FormControl(invoice ? invoice.visualID : '', [
                Validators.required,
            ], invoice ? undefined : [
                this.uniqueID(),
            ]
            ),
            date: new FormControl(invoice ? invoice.date : moment().format(), [
                Validators.required,
            ]),
            cif: new FormControl(invoice ? invoice.cif : localStorage.getItem('cif') || '', [
                Validators.required,
            ]),
            nameCompany: new FormControl(invoice ? invoice.nameCompany : localStorage.getItem('nameCompany') || '', [
                Validators.required,
            ]),
            fisicalAddress: new FormControl(invoice ? invoice.fisicalAddress : localStorage.getItem('fisicalAddress') || '', [
                Validators.required,
            ]),
            notes: new FormControl(invoice ? invoice.notes : ''),
            received: new FormControl(invoice ? invoice.received : true),
        });
        return this;
    }

    createStyle() {
        this.style = new FormStyle([{
            type: 'text',
            name: 'nameCompany',
            label: 'Nombre de la compañia',
        }, {
            type: 'text',
            name: 'fisicalAddress',
            label: 'Dirección fiscal',
        }, {
            type: 'textarea',
            name: 'notes',
            label: 'Notas',
            rows: 3,
        }, {
            type: 'text',
            name: 'visualID',
            label: 'ID',
            cols: 2,
        }, {
            type: 'date',
            name: 'date',
            label: 'Fecha',
            info: 'Formato mm/dd/yyyy',
            cols: 3,
        }, {
            type: 'text',
            name: 'cif',
            label: 'DNI/NIF',
            cols: 3,
        }, {
            type: 'sliderToggle',
            name: 'received',
            placeholder: 'Recibida',
            cols: 2,
        }]);
        return this;
    }

    public addLine() {
        this.invoiceLinesForm.push(this.getFormLine());
        this.invoiceLinesStyles.push(this.getFormStyle());
        return this;
    }

    private getFormLine() {
        return new FormGroup({
            description: new FormControl(),
            iva: new FormControl(21),
            quantity: new FormControl(0),
            price: new FormControl(0),
        });
    }

    private getFormStyle() {
        return new FormStyle([
            {
                type: 'text',
                name: 'description',
                label: 'Descripción',
            }, {
                type: 'number',
                name: 'iva',
                label: 'IVA',
            }, {
                type: 'number',
                name: 'quantity',
                label: 'Cantidad',
            }, {
                type: 'number',
                name: 'price',
                label: 'Precio',
            },
        ]);
    }
}
