import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
    imports: [UserModule, InvoicesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
