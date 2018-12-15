import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [UserModule, InvoicesModule, AuthModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule { }
