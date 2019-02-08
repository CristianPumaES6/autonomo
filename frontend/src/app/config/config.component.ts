import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IConfig } from '@isofocus/interfaces';
import { ConfigService } from './config.service';
import { SnackService } from '../shared/service/snack.service';
import { FormStyle } from '../form/classes/form-style';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    form: FormGroup;
    style: FormStyle;
    firstTime = true;

    @ViewChild('htmlCardContent') htmlCardContent: HTMLElement | any;

    constructor(protected readonly configService: ConfigService) { }

    ngOnInit() {
        this.configService.getMy().subscribe(config => {
            this.form = this.configService.createForm(config);
            this.style = this.configService.createStyle();
            this.form.valueChanges.pipe(debounceTime(1500)).subscribe(() => this.updateConfig());
        });
    }

    updateConfig() {
        const config: IConfig = this.form.getRawValue();
        this.configService.put(config).subscribe(() => SnackService.send$.emit('Configuración cambiada con éxito'));
    }
}
