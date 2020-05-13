import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {RatingsController} from './ratings.controller';
import {RatingsService} from './ratings.service';
import {RatingRepository} from './rating.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {grpcClientOptions} from '../config/grpc-client.options';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RATINGS_PACKAGE',
                ...grpcClientOptions,
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