import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import config from 'config';
import {Logger} from '@nestjs/common';
import {grpcClientOptions} from './grpc-client.options';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const serverConfig = config.server;
    const app = await NestFactory.create(AppModule);

    app.connectMicroservice(grpcClientOptions);
    await app.startAllMicroservicesAsync();

    app.enableShutdownHooks();

    const port = process.env.PORT || serverConfig.port;

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}

bootstrap();