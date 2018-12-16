import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { auth } from '../shared/classes/auth';
import { User } from '../db/models/user';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    async login(@Body() body: any) {
        return { token: await this.authService.login(new User(body)) };
    }

    @Get('token')
    token(@Headers('authorization') authorization: string) {
        return { ok: auth.decode(authorization) ? true : false };
    }

    @Post('register')
    async register(@Body() body: any) {
        return { token: await this.authService.register(new User(body)) };
    }
}
