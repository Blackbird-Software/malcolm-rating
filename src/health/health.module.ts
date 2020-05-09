import {Module} from '@nestjs/common';
import {HealthController} from './health.controller';
import {TerminusModule} from '@nestjs/terminus';
import {DatabaseOrmModule} from '../database-orm.module';
import {ClientsModule} from '@nestjs/microservices';
import {HealthCheckController} from './health-check.controller';
import {grpcClientOptions} from '../grpc-client.options';

@Module({
    controllers: [HealthController, HealthCheckController],
    imports: [
        ClientsModule.register([
            {
                name: 'HEALTH_PACKAGE',
                ...grpcClientOptions,
            },
        ]),
        DatabaseOrmModule(),
        TerminusModule,
    ],
})

export class HealthModule {
}
