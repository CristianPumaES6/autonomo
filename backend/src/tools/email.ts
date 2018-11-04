import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER, EMAIL_FROM, EMAIL_SERVICE } from './constants';

interface IToSend {
    to: string;
    subject?: string;
}

interface ITemplate {
    link: string;
}

export class Email {
    private _transporter: nodemailer.Transporter;
    private _defaultOptions: nodemailer.SendMailOptions = {
        from: EMAIL_FROM,
    };
    private _message: string;
    public get message(): string {
        return this._message;
    }
    public set message(value: string) {
        this._message = value;
    }

    constructor() {
        this._transporter = nodemailer.createTransport({
            host: EMAIL_HOST,
            service: EMAIL_SERVICE,
            port: 465,
            secure: true, // use SSL
            auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASSWORD,
            },
        });
    }

    public async sendMail(toSend: IToSend) {
        return await this._transporter.sendMail({ ...this._defaultOptions, ...toSend, html: this._message });
    }

    public setTemplate() {
        this.message = fs.readFileSync(path.resolve(__dirname, '../template/template.html'), 'utf-8');
        return this;
    }
}
