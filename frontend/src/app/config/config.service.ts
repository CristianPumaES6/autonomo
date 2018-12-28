import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '@isofocus/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormStyle } from '../form/classes/form-style';

@Injectable({
    providedIn: 'root'
})
export class ConfigService extends BaseService<IConfig> {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL += '/config/';
    }

    getMy() {
        return this.httpClient.get<IConfig>(this.SERVER_URL);
    }

    createForm(config: IConfig) {
        return new FormGroup({
            ivaDefaultReceived: new FormControl(config.ivaDefaultReceived, [Validators.required]),
            ivaDefaultSent: new FormControl(config.ivaDefaultSent, [Validators.required]),
            totalItemsByTable: new FormControl(config.totalItemsByTable, [Validators.required]),
        });
    }

    createStyle() {
        return new FormStyle([{
            type: 'number',
            name: 'ivaDefaultReceived',
            label: 'IVA recibido por defecto',
        }, {
            type: 'number',
            name: 'ivaDefaultSent',
            label: 'Iva emitido por defecto',
        }, {
            type: 'number',
            name: 'totalItemsByTable',
            label: 'Total de registros por tabla',
        }]);
    }
}
