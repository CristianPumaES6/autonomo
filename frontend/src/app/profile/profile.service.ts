import { Injectable } from '@angular/core';
import { BaseService } from '../shared/service/base.service';
import { IUser } from '../../../../global/interfaces';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormStyle } from '../form/classes/form-style';

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

    createForm(user: IUser) {
        return new FormGroup({
            name: new FormControl(user.name, [
                Validators.required,
            ]),
            phone: new FormControl(user.phone, [
                Validators.required,
            ]),
            email: new FormControl(user.email, [
                Validators.required,
                Validators.email,
            ]),
            address: new FormControl(user.address, [
                Validators.required,
            ]),
            dni: new FormControl(user.dni, [
                Validators.required,
            ]),
        });
    }

    createStyle() {
        return new FormStyle([{
            type: 'text',
            name: 'name',
            label: 'Nombre',
        }, {
            type: 'tel',
            name: 'phone',
            label: 'Teléfono',
        }, {
            type: 'email',
            name: 'email',
            label: 'Email',
        }, {
            type: 'text',
            name: 'address',
            label: 'Dirección',
            cols: 1,
        }, {
            type: 'text',
            name: 'dni',
            label: 'DNI/NIE',
            info: '¡Importante! Se utiliza en las facturas emitidas',
            cols: 2,
        }]);
    }
}
