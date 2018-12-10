import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { HttpClient } from '@angular/common/http';
import { IConfig } from '@isofocus/interfaces';
import { Observable } from 'rxjs';

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
}
