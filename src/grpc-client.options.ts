import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:50051',
        package: 'ratings',
        protoPath: join(__dirname, './ratings/ratings.proto'),
    },
};