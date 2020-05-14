import {Inject, Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {RatingRepository} from './rating.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {RatingDto} from './dto/rating.dto';
import {RatingInterface} from './interface/rating.interface';
import {RatingsInterface} from './interface/ratings.interface';
import {ClientProxy} from "@nestjs/microservices";
import {MessagePatternType} from "../enum/message-pattern-type";

@Injectable()
export class RatingsService implements OnModuleInit {

    constructor(
        @InjectRepository(RatingRepository) private readonly ratingsRepository: RatingRepository,
        @Inject('QUEUE_SERVICE') private readonly clientRmq: ClientProxy,
    ) {
    }

    async onModuleInit() {
        await this.clientRmq.connect();
    }

    async create(dto: RatingDto): Promise<RatingInterface> {
        const rating = await this.ratingsRepository.createRating(dto);

        // @TODO move to service
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
                    console.error(error);
                }
            );

        return rating;
    }

    async findById(id: string): Promise<RatingInterface> {
        const found = await this.ratingsRepository.findOne(id);

        if (!found) {
            throw new NotFoundException('Rating not found. ');
        }

        return found;
    }

    async findByType(type: string): Promise<RatingsInterface> {
        return this.ratingsRepository.find({type});
    }

    async findAll(): Promise<RatingsInterface> {
        return this.ratingsRepository.find();
    }
}