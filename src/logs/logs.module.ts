import {Module} from '@nestjs/common';
import {ClientsModule} from '@nestjs/microservices';
import {rmqClientOptions} from '../config/option/rmq-client.options';
import {LogsService} from './logs.service';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'QUEUE_SERVICE',
                ...rmqClientOptions,
            },
        ]),
    ],
    providers: [LogsService],
    exports: [LogsService]
})

export class LogsModule {
}