import {GrpcOptions, Transport} from '@nestjs/microservices';
import {join} from 'path';

export const grpcClientOptions: GrpcOptions = {
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:5000',
        package: ['ratings', 'health'],
        protoPath: [
            join(__dirname, './../../ratings/ratings.proto'),
            join(__dirname, './../../health/health.proto'),
        ]
    },
};