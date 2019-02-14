import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '@isofocus/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormStyle } from '../form/classes/form-style';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ConfigService extends BaseService<IConfig> {
    constructor(httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL = '/config/';
    }

    getMy() {
        const config = JSON.parse(localStorage.getItem('config'));
        if (!config) return this.httpClient.get<IConfig>(this.SERVER_URL).pipe(
            map(config => {
                localStorage.setItem('config', JSON.stringify(config));
                return config;
            })
        );
        return new Observable<IConfig>(subscriber => {
            subscriber.next(config);
            subscriber.complete();
        });
    }


    put(data: IConfig) {
        localStorage.setItem('confg', JSON.stringify(data));
        return this.httpClient.put<IConfig>(this.SERVER_URL, data);
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
            type: 'select',
            name: 'totalItemsByTable',
            label: 'Total de registros por tabla',
            options: [{
                label: 10,
                value: 10,
            }, {
                label: 50,
                value: 50,
            }, {
                label: 100,
                value: 100,
            }]
        }]);
    }
}
