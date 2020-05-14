import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {RatingsController} from './ratings.controller';
import {RatingsService} from './ratings.service';
import {RatingRepository} from './rating.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {grpcClientOptions} from '../config/option/grpc-client.options';
import {rmqClientOptions} from "../config/option/rmq-client.options";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RATINGS_PACKAGE',
                ...grpcClientOptions,
            },
        ]),
        ClientsModule.register([
            {
                name: 'QUEUE_SERVICE',
                ...rmqClientOptions,
            },
        ]),
        TypeOrmModule.forFeature([RatingRepository]),
        RatingRepository
    ],
    controllers: [RatingsController],
    providers: [RatingsService]
})

export class RatingsModule {
}