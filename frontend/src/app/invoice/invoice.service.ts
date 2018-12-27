import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IInvoice } from '@isofocus/interfaces';
import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { FormStyle } from '../form/classes/form-style';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService<IInvoice> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL += '/invoice/';
    }

    getCharts() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart/all');
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
        return new FormGroup({
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
            iva: new FormControl(invoice ? invoice.iva : 0, [
                Validators.required,
            ]),
            price: new FormControl(invoice ? invoice.price : 0, [
                Validators.required,
            ]),
            description: new FormControl(invoice ? invoice.description : ''),
            notes: new FormControl(invoice ? invoice.notes : ''),
            received: new FormControl(invoice ? invoice.received : true),
        });
    }

    createStyle() {
        return new FormStyle([{
            name: 'visualID',
            type: 'text',
            label: 'ID',
        }, {
            type: 'date',
            name: 'date',
            label: 'Fecha',
            info: 'Formato mm/dd/yyyy'
        }, {
            type: 'text',
            name: 'fisicalAddress',
            label: 'Dirección fiscal',
        }, {
            type: 'textarea',
            name: 'description',
            label: 'Descripción',
            rows: 3,
        }, {
            type: 'textarea',
            name: 'notes',
            label: 'Notas',
            rows: 3,
        }, {
            type: 'text',
            name: 'cif',
            label: 'DNI/NIF',
        }, {
            type: 'text',
            name: 'nameCompany',
            label: 'Nombre de la compañia',
        }, {
            type: 'number',
            name: 'iva',
            label: 'IVA',
            cols: 2,
        }, {
            type: 'number',
            name: 'price',
            label: 'Precio',
            info: 'Precio sin iva',
            cols: 2,
        }, {
            type: 'sliderToggle',
            name: 'received',
            placeholder: 'Recibida',
            cols: 2,
        }]);
    }
}
