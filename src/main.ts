import {NestFactory, Reflector} from '@nestjs/core';
import { grpcClientOptions } from './grpc-client.options';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor} from '@nestjs/common';
import {MicroserviceOptions} from "@nestjs/microservices";

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, grpcClientOptions);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.listenAsync();
}

bootstrap();