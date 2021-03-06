import { Controller, Get, Headers, Put, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { auth } from '../shared/classes/auth';
import { IUser } from '../../../global/interfaces';

@Controller('user')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get('my')
    async get(@Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        return await this.usersService.get(id);
    }

    @Put('profile')
    async getById(@Body() body: IUser, @Headers('authorization') authorization: string) {
        const id = auth.decode(authorization);
        body.id = id;
        return await this.usersService.update(body);
    }
}
