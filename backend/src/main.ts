import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {

    // const fs = require('fs');
    // const keyFile = fs.readFileSync(__dirname + '/../ssl/mydomain.com.key.pem');
    // const certFile = fs.readFileSync(__dirname + '/../ssl/mydomain.com.crt.pem');

    // const app = await NestFactory.create(AppModule, {
    //     httpsOptions: {
    //         key: keyFile,
    //         cert: certFile,
    //     }
    // });

    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
