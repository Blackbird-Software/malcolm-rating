import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import config from 'config';
import {Logger} from '@nestjs/common';
import {grpcClientOptions} from './config/option/grpc-client.options';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
    const logger = new Logger('bootstrap');
    const serverConfig = config.server;
    const app = await NestFactory.create(AppModule);

    if (process.env.NODE_ENV === 'development') {
        app.enableCors();
    } else {
        app.enableCors({origin: serverConfig.origin});
        logger.log(`Accepting requests from origin "${serverConfig.origin}"`);
    }

    app.connectMicroservice(grpcClientOptions);
    await app.startAllMicroservicesAsync();

    const options = new DocumentBuilder()
        .setTitle('Malcolm logs')
        .setDescription('Logs endpoints')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

    app.enableShutdownHooks();

    const port = process.env.PORT || serverConfig.port;

    await app.listen(port);
    logger.log(`Application listening on port ${port}`);
}

bootstrap();