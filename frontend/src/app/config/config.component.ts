import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IConfig } from '@isofocus/interfaces';
import { ConfigService } from './config.service';
import { SnackService } from '../shared/service/snack.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
    formConfig: FormGroup;
    cols: number;
    firstTime = true;

    @ViewChild('htmlCardContent') htmlCardContent: HTMLElement | any;

    constructor(protected readonly configService: ConfigService) { }

    ngOnInit() {
        this.configService.getMy().subscribe(config => {
            this.formConfig = new FormGroup({
                ivaDefaultReceived: new FormControl(config.ivaDefaultReceived, [Validators.required]),
                ivaDefaultSent: new FormControl(config.ivaDefaultSent, [Validators.required]),
                totalItemsByTable: new FormControl(config.totalItemsByTable, [Validators.required]),
            });

            this.formConfig.valueChanges.debounceTime(1000).subscribe(() => this.updateConfig());
        });
    }

    updateConfig() {
        const config: IConfig = this.formConfig.getRawValue();
        this.configService.put(config).subscribe(() => SnackService.send$.emit('Configuración cambiada con éxito'));
    }


    resize() {
        if (this.htmlCardContent.nativeElement.offsetWidth < 767) this.cols = 12;
        else if (this.htmlCardContent.nativeElement.offsetWidth < 1025) this.cols = 6;
        else this.cols = undefined;
    }
}
