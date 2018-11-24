import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IUser } from '../../../../global/interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProfileService extends BaseService<IUser> {

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
        this.SERVER_URL += '/user/';
    }

    getMy() {
        return this.httpClient.get(this.SERVER_URL + 'my');
    }

    putProfile(user: IUser) {
        return this.httpClient.put(this.SERVER_URL + 'profile', user);
    }
}
