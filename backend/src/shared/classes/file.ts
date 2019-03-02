import { IFile } from '../../../../global/interfaces';
import { db } from '../../db';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { MAX_SIZE_FILE } from '../../app.constants';

export async function saveImage(file: { name: string, data: string }) {
    let fileToSave: IFile = {},
        size = (file.data.length * (3 / 4)) / 1000.0;

    if ((size) >= MAX_SIZE_FILE) throw new HttpException('Archivo demasiado grande', HttpStatus.NOT_ACCEPTABLE);

    const type = file.data.match(/data:([\w])+\/*([\w])*/),
        data = file.data.replace(/data:([\w])+\/*([\w])*;base64,/, ''),
        path2 = crypto.createHash('sha1').update(data).digest('hex'),
        binder = path2.substr(0, 3),
        name = path2.substr(3);

    let pathAbsolute = path.join(__dirname, `../../files/${binder}/${name}`);
    ensureDirectoryExistence(pathAbsolute);

    if (!type) throw new HttpException('No se ha podido guardar el fichero', HttpStatus.NOT_ACCEPTABLE);

    let extension = `.${type[0].replace('data:', '').split('/')[1]}`;

    pathAbsolute += extension;

    fs.writeFileSync(pathAbsolute, data, 'base64');


    fileToSave.type = type[0].replace('data:', '');
    fileToSave.path = `/${binder}/${name}${extension}`;
    fileToSave.name = file.name;
    fileToSave.size = size;

    return await db.models.file.create(fileToSave);
}


function ensureDirectoryExistence(filePath: string): boolean | void {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}