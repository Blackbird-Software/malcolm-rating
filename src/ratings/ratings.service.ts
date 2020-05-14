import {Injectable, NotFoundException} from '@nestjs/common';
import {RatingRepository} from './rating.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {RatingDto} from './dto/rating.dto';
import {RatingInterface} from './interface/rating.interface';
import {RatingsInterface} from './interface/ratings.interface';
import {LogsService} from '../logs/logs.service';
import {ActionType} from '../enum/action-types';

@Injectable()
export class RatingsService {

    constructor(
        @InjectRepository(RatingRepository) private readonly ratingsRepository: RatingRepository,
        private readonly logsService: LogsService
    ) {
    }

    async create(dto: RatingDto): Promise<RatingInterface> {
        const rating = await this.ratingsRepository.createRating(dto);
        await this.logsService.sendMessage(rating, ActionType.CREATE);

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