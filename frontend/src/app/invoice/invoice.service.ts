import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IInvoice } from '@isofocus/interfaces';
import { HttpClient } from '@angular/common/http';

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
}
