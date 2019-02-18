import { IFile } from '../../../../global/interfaces';
import { db } from 'src/db';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export async function saveImage(file: { name: string, data: string }) {
    let fileToSave: IFile = {};

    const type = file.data.match(/data:([\w])+\/*([\w])*/),
        data = file.data.replace(/data:([\w])+\/*([\w])*;base64,/, ''),
        path2 = crypto.createHash('sha1').update(data).digest('hex'),
        binder = path2.substr(0, 3),
        name = path2.substr(3);

    let pathFile = path.join(__dirname, `../../files/${binder}/${name}`);
    ensureDirectoryExistence(pathFile);
    
    if (!type) throw new HttpException('No se ha podido guardar el fichero', HttpStatus.NOT_ACCEPTABLE);
    
    pathFile += name + '.' + type[0].replace('data:', '').split('/')[1];

    fs.writeFileSync(pathFile, data, 'base64');

    const stats = fs.statSync(pathFile);

    fileToSave.type = type[0].replace('data:', '');
    fileToSave.path = `/${binder}/${name}.${type[0].replace('data:', '').split('/')[1]}`;
    fileToSave.name = file.name;
    fileToSave.size = stats.size / 1000.0; // Convertirlo a KB

    return await db.models.file.create(fileToSave);
}


function ensureDirectoryExistence(filePath: string): boolean | void {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}