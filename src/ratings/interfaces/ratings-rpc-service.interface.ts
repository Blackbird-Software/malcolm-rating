import {RatingDto} from '../dto/rating.dto';
import {Observable} from 'rxjs';
import {RatingInterface} from '../rating.interface';
import {GetRatingDto} from '../dto/get-rating.dto';
import {RatingsInterface} from './ratings.interface';
import GetRatingTypeDto from '../dto/get-rating-type.dto';

export default interface RatingsRpcService {
    save(dto: RatingDto): Promise<RatingInterface>;
    findById(dto: GetRatingDto): Promise<RatingInterface>;
    listAllStream(dto: {}): Observable<RatingsInterface>;
    listAllByTypeStream(dto: GetRatingTypeDto): Promise<RatingsInterface>;
}