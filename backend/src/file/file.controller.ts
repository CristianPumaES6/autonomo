import { Controller, Get } from '@nestjs/common';

@Controller('file')
export class FileController {
    @Get('/:path/:name')
    async getFile() {
        
    }
}
