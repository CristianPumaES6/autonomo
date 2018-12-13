import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    async get() {
        return { user: 'user' };
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return { user: 'user' + id };
    }
}
