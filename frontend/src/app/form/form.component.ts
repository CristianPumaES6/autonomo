import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Inject, OnChanges } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormStyle } from './classes/form-style';
import { IStyle } from './entities/iStyle';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ImageCropperComponent, CropperSettings } from 'ng2-img-cropper';
import { SnackService } from '../shared/service/snack.service';

@Component({
    selector: 'if-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    rowHeight = '75px';
    sended = false;
    firstSizes = [];
    send = false;
    imageDefault = '../../assets/imgs/';
    lastLength: number;

    @Input() title: string;
    @Input() image = 'avatarDefault.web';
    @Input() subtitle: string;
    @Input() cols = 12;
    @Input() labelAccept: string;
    @Input() showCard = false;
    @Input() newButton = false;
    @Input() backButton = false;
    @Input() cancelButton = true;
    @Input() acceptButton = true;
    @Input() form: FormGroup;
    @Input() style: FormStyle;
    @Input() defaultCol = 3;
    @Input() row = 1;

    @Output() data: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<boolean> = new EventEmitter();
    @Output() cancel: EventEmitter<boolean> = new EventEmitter();
    @Output() add: EventEmitter<boolean> = new EventEmitter();

    @ViewChild('formElement') formElement: HTMLFormElement;

    constructor(public dialog: MatDialog) {
        this.imageDefault += this.image;
    }

    ngOnInit() {
        for (const item of this.style.styles) {
            this.firstSizes.push(item.type !== 'divider' ? (item.cols || this.defaultCol) : undefined);
            if (this.form.get(item.name) && this.form.get(item.name).valueChanges) {
                this.form.get(item.name).valueChanges.subscribe(() => this.submitChange(item));
            }
        }
        this.resize();
    }

    cancelForm() {
        this.cancel.emit(true);
    }

    addForm() {
        this.add.emit(true);
    }

    dataForm() {
        if (this.form.valid) {
            this.sended = true;
            let itemToSend = {};
            for (const i in this.form.getRawValue())
                if (this.form.getRawValue()[i] !== undefined && this.form.getRawValue()[i] !== null)
                    itemToSend[i] = this.form.getRawValue()[i];
            this.data.emit(itemToSend);
        }
    }

    deleteForm() {
        this.delete.emit(true);
    }

    submitChange(send: IStyle) {
        if (!this.send && send.submitOnChanges) {
            this.send = true;
            this.form.valueChanges.debounceTime(500).subscribe(() => this.dataForm());
        }
    }

    hasRequiredField(abstractControl: AbstractControl): boolean {
        if (abstractControl && abstractControl.validator) {
            const validator = abstractControl.validator({} as AbstractControl);
            return validator && validator.required;
        }
        return false;
    }

    public resetButtonForm() {
        this.sended = false;
    }

    resize() {
        if (this.formElement.nativeElement.offsetWidth < 767) this.resizeCols(1);
        else if (this.formElement.nativeElement.offsetWidth < 1025) this.resizeCols(2);
        else this.resizeCols(3);
    }

    resizeCols(type: 1 | 2 | 3) {
        for (const i in this.style.styles) {
            if (this.style.styles[i].type === 'file' && type === 2) this.style.styles[i].cols = this.cols;
            else this.style.styles[i].cols = (type === 1 ? this.cols : type === 2 ? this.cols / 2 : this.firstSizes[i]);
        }
    }

    fileChange(event, item) {
        let readers: FileReader[] = [], items = [], totalItems;
        if (this.form.get(item.name).value && typeof this.form.get(item.name).value === 'object') items = this.form.get(item.name).value;
        totalItems = items.length;
        if (!item.max || (item.max && totalItems < item.max)) {
            for (const i in event.target.files) {
                let file = event.target.files[i];
                if (!item.max || (item.max && totalItems < item.max)) {
                    if (!isNaN(+i)) {
                        totalItems++;
                        readers[i] = new FileReader;
                        readers[i].onloadend = () => {
                            if (readers[i]) {
                                items.push({
                                    name: file.name,
                                    data: readers[i].result,
                                });
                                this.form.get(item.name).setValue(items);
                            }
                        };
                        readers[i].readAsDataURL(file);
                    }
                } else SnackService.send$.emit(`No puedes subir más ficheros (${file.name.substring(0, 20)}...).`);
            }
        } else SnackService.send$.emit('No puedes subir más ficheros.')
    }

    deleteFile(item, i) {
        this.form.get(item.name).setValue(this.form.get(item.name).value.filter((f, index) => i !== index));
    }

    dropFiles(event: any, item) {
        event.preventDefault();
        let files = [];
        for (let i = 0; i < event.dataTransfer.items.length; i++)
            if (event.dataTransfer.items[i].kind === 'file')
                files.push(event.dataTransfer.items[i].getAsFile());
        let ev = { target: { files } };
        this.fileChange(ev, item);
    }

    dragOverFiles(event) {
        event.preventDefault();
    }

    imageChange(event, item) {
        let file: File = event.target.files[0],
            myReader: FileReader = new FileReader();
        myReader.onloadend = (loadEvent: any) => this.openImageCropper(item, loadEvent.target.result, file.name);
        myReader.readAsDataURL(file);
    }

    openImageCropper(item, image, name) {
        this.dialog.open(dialogImageComponent, {
            data: {
                item,
                image: {
                    name: name,
                    data: image
                }
            }
        }).afterClosed().subscribe(result => {
            if (result) this.form.get(result.item.name).setValue(result.image);
        });
    }

    removeChips(item, name) {
        let value = this.form.get(item.name).value;
        this.form.get(item.name).setValue(value.filter(n => n !== name));
    }

    addChips(item, event) {
        let value = [];
        if (this.form.get(item.name).value && this.form.get(item.name).value.map) value = this.form.get(item.name).value;
        if (!~value.indexOf(event.value) && event.value.trim() !== '' && event.value) value.push(event.value);
        this.form.get(item.name).setValue(value);
        event.input.value = '';
    }

    clear() {
        this.form.reset();
    }
}

@Component({
    selector: 'dialog-image',
    templateUrl: 'dialog-image.html',
    styleUrls: ['./dialog-image.scss']
})
export class dialogImageComponent {
    cropperSettings: CropperSettings;
    image = new Image();
    @ViewChild('cropper') cropper: ImageCropperComponent;
    constructor(
        public dialogRef: MatDialogRef<dialogImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.cropperSettings = new CropperSettings();
        this.cropperSettings.noFileInput = true;
        this.cropperSettings.croppedWidth = this.data.item.width;
        this.cropperSettings.croppedHeight = this.data.item.height;
        this.cropperSettings.width = this.data.item.width;
        this.cropperSettings.height = this.data.item.height;
        this.cropperSettings.canvasWidth = 600;
        this.image.src = this.data.image.data;
        setTimeout(() => this.cropper.setImage(this.image));
    }

    accept() {
        this.data.image.data = this.cropper.image.image;
        this.dialogRef.close(this.data);
    }

}
