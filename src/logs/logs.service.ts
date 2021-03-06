import {Inject, Injectable, OnModuleInit} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ActionType} from './enum/action-types';
import config from 'config';
import {MessagePatternType} from './enum/message-pattern-types';
const service = config.service;

@Injectable()
export class LogsService implements OnModuleInit {

    constructor(
        @Inject('QUEUE_SERVICE') private readonly clientRmq: ClientProxy,
    ) {
    }

    async onModuleInit() {
        await this.clientRmq.connect();
    }

    async sendMessage(object: any, entity: string, action: ActionType): Promise<any> {
        const pattern = {type: MessagePatternType.APP_LOGS};
        const data = {
            action,
            entity: entity,
            service: service.id,
            objectId: object.id,
            object: JSON.stringify(object)
        };

        this.clientRmq.send(pattern, data)
            .toPromise()
            .catch((error: any) => {
                    // console.error(error);
                }
            );
    }
}