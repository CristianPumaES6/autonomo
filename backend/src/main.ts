import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
import * as fs from 'fs';
import { PROD, ROUTE_PRIVKEY } from './app.constants';
import { ROUTE_CERT } from '../dist/app.constants';

async function bootstrap() {
    const keyFile = PROD ? fs.readFileSync(ROUTE_PRIVKEY) : undefined;
    const certFile = PROD ? fs.readFileSync(ROUTE_CERT) : undefined;

    const app = PROD ? await NestFactory.create(AppModule, {
        httpsOptions: {
            key: keyFile,
            cert: certFile,
        },
    }) : await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
