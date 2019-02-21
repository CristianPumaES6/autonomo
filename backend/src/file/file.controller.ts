import { Controller, Get, Param, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('file')
export class FileController {
    constructor(protected fileService: FileService) {}

    @Get('/:path/:name')
    async getFile(@Param('path') dir: string, @Param('name') fileName: string, @Res() res: Response) {
        let file = path.join(__dirname, '..', 'files', dir, fileName);

        try {
            if (fs.existsSync(file)) res.sendFile(file);
            else throw new HttpException('Imagen no encontrada', HttpStatus.NOT_FOUND);
        } catch (ex) {
            throw new HttpException('Imagen no encontrada', HttpStatus.NOT_FOUND);
        }
    }
}
