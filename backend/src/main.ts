import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as fs from 'fs';
import { PROD, ROUTE_PRIVKEY, ROUTE_CERT } from './app.constants';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const keyFile = PROD ? fs.readFileSync(ROUTE_PRIVKEY) : undefined;
    const certFile = PROD ? fs.readFileSync(ROUTE_CERT) : undefined;

    const app = PROD ? await NestFactory.create(AppModule, {
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        },
    }) : await NestFactory.create(AppModule);
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
