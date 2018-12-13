import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    async get() {
        return await this.usersService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        return await this.usersService.get(id);
    }
}
