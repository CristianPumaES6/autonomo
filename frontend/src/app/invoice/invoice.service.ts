import { Injectable, EventEmitter } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IInvoice, IInvoiceLine, IConfig } from '@isofocus/interfaces';
import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import * as moment from 'moment';
import { FormStyle } from '../form/classes/form-style';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService<IInvoice> {
    newFile$: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL = '/invoice';
    }

    getCharts(year: number | string) {
        return this.httpClient.get<any>(`${this.SERVER_URL}/chart/${year}`);
    }

    getNext() {
        return this.httpClient.get<number>(`${this.SERVER_URL}/next`);
    }

    checkID(id: number) {
        return this.httpClient.get<{ ok: boolean }>(`${this.SERVER_URL}/check/${id}`);
    }

    getTotalSize() {
        return this.httpClient.get<number>(`${this.SERVER_URL}/total/size`);
    }

    getPDF(id: number) {
        return this.httpClient.get(`${this.SERVER_URL}/pdf/${id}`);
    }

    /**
     * VALIDATORS
     */
    uniqueID(): AsyncValidatorFn {
        return (control: AbstractControl) => timer(750).pipe(switchMap(() => this.checkID(control.value).pipe(map(response => !response.ok ? { invalidID: true } : null))));
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
            notes: new FormControl(invoice ? invoice.notes : ''),
            received: new FormControl(invoice ? invoice.received : true),
            file: new FormControl(invoice ? invoice.file : null),
        });
    }

    createStyle() {
        return new FormStyle([{
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
        }, {
            type: 'file',
            name: 'file',
            label: 'Factura',
            info: 'Tamaño máximo 1MB',
            rows: 2,
            cols: 6,
        }]);
    }

    getFormLine(invoiceLine?: IInvoiceLine) {
        // TODO: MIRAR UNA MEJOR FORMA DE PONERLO
        const config = JSON.parse(localStorage.getItem('config')) as IConfig;
        return new FormGroup({
            description: new FormControl(invoiceLine ? invoiceLine.description : ''),
            iva: new FormControl(invoiceLine ? invoiceLine.iva : config.ivaDefaultReceived || 0),
            quantity: new FormControl(invoiceLine ? invoiceLine.quantity : 1),
            price: new FormControl(invoiceLine ? invoiceLine.price : ''),
        });
    }

    getFormStyle() {
        return new FormStyle([
            {
                type: 'text',
                name: 'description',
                label: 'Descripción',
                cols: 9,
            }, {
                type: 'number',
                name: 'iva',
                label: 'IVA',
                suffix: '%',
                cols: 1,
            }, {
                type: 'number',
                name: 'quantity',
                label: 'Cantidad',
                cols: 1,
            }, {
                type: 'number',
                name: 'price',
                label: 'Precio',
                info: 'Sin IVA',
                suffix: '€',
                cols: 1,
            },
        ]);
    }
}
