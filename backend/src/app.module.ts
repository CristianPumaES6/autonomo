import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { IsLoggedMiddleware } from './shared/middleware/is-logged.middleware';
import { UsersController } from './users/users.controller';
import { InvoicesController } from './invoices/invoices.controller';
import { ConfigsModule } from './configs/configs.module';
import { ConfigsController } from './configs/configs.controller';
import { ChartsModule } from './invoices/charts/charts.module';

@Module({
    imports: [ChartsModule, UserModule, InvoicesModule, AuthModule, ConfigsModule],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(cosumer: MiddlewareConsumer) {
        cosumer
            // MIDDLEWARE TO LOGGER
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL })
            // MIDDLEWARE TO LOGGED
            .apply(IsLoggedMiddleware)
            .forRoutes(UsersController, InvoicesController, ConfigsController);
    }
}
