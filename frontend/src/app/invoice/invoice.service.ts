import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IInvoice } from '@isofocus/interfaces';
import { HttpClient } from '@angular/common/http';
import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService<IInvoice> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL += '/invoice/';
    }

    getChartTotal() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart/total');
    }

    getChartEarned() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart/earned');
    }

    getChartWasted() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart/wasted');
    }

    getChartIvaEarn() {
        return this.httpClient.get<any>(this.SERVER_URL + 'chart/ivaearn');
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
                () => this.checkID(control.value).map(response => !response.ok ? { invalidID: true } : null)
            );
    }
}
