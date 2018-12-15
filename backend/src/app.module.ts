import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';

@Module({
    imports: [UserModule, InvoicesModule, AuthModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(cosumer: MiddlewareConsumer) {
        cosumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
