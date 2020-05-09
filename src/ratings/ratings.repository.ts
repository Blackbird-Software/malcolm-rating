import {Rating} from './rating.entity';
import {EntityRepository, Repository} from 'typeorm';
import {RatingDto} from './dto/rating.dto';
import {RatingInterface} from './rating.interface';
import RatingTypeConverter from './enum/rating-type-converter';

@EntityRepository(Rating)
export class RatingsRepository extends Repository<Rating> {

    async createRating(data: RatingDto): Promise<RatingInterface> {
        const rating = new Rating();
        rating.comment = data.comment;
        rating.type = RatingTypeConverter.fromIntToRatingType(data.type);
        rating.value = data.value;
        await rating.save();

        return rating;
    }

}