import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {RatingsController} from './ratings.controller';
import {RatingsService} from './ratings.service';
import {RatingsRepository} from './ratings.repository';
import {TypeOrmModule} from '@nestjs/typeorm';
import {grpcClientOptions} from '../grpc-client.options';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'RATINGS_PACKAGE',
                ...grpcClientOptions,
            },
        ]),
        TypeOrmModule.forFeature([RatingsRepository]),
        RatingsRepository
    ],
    controllers: [RatingsController],
    providers: [RatingsService]
})

export class RatingsModule {
}