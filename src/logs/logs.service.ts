import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {MessagePatternType} from '../enum/message-pattern-type';
import {Rating} from '../ratings/rating.entity';

@Injectable()
export class LogsService implements OnModuleInit {

    constructor(
        @Inject('QUEUE_SERVICE') private readonly clientRmq: ClientProxy,
    ) {
    }

    async onModuleInit() {
        await this.clientRmq.connect();
    }

    async sendMessage(rating: Rating): Promise<any> {
        const pattern = {type: MessagePatternType.APP_LOGS};
        const data = {
            action: 0,
            service: 2,
            objectId: rating.id,
            object: JSON.stringify(rating)
        };

        this.clientRmq.send(pattern, data)
            .toPromise()
            .catch((error: any) => {
                    // console.error(error);
                }
            );
    }
}