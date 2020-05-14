import {Rating} from './rating.entity';
import {EntityRepository, Repository} from 'typeorm';
import {RatingDto} from './dto/rating.dto';
import RatingTypeConverter from './enum/rating-type-converter';

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {

    async createRating(data: RatingDto): Promise<Rating> {
        const rating = new Rating();
        rating.comment = data.comment;
        rating.type = RatingTypeConverter.fromIntToRatingType(data.type);
        rating.value = data.value;
        await rating.save();

        return rating;
    }

}