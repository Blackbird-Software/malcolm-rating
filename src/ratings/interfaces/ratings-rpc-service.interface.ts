import {RatingDto} from '../dto/rating.dto';
import {Observable} from 'rxjs';
import {RatingInterface} from '../rating.interface';
import {GetRatingDto} from '../dto/get-rating.dto';
import {RatingsInterface} from './ratings.interface';
import GetRatingTypeDto from '../dto/get-rating-type.dto';

export default interface RatingsRpcService {
    save(dto: RatingDto): Promise<RatingInterface>;
    findById(dto: GetRatingDto): Promise<RatingInterface>;
    listAll(req: {}): Promise<RatingsInterface>;
    listAllByType(dto: GetRatingTypeDto): Promise<RatingsInterface>;
    findByIdStream(upstream: Observable<GetRatingDto>): Promise<Observable<RatingInterface>>;
}