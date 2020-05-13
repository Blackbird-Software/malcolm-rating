import {RatingDto} from '../dto/rating.dto';
import {Observable} from 'rxjs';
import {RatingInterface} from './rating.interface';
import {GetRatingDto} from '../dto/get-rating.dto';
import GetRatingTypeDto from '../dto/get-rating-type.dto';
import RatingsResponseInterface from "./ratings-response.interface";

export default interface RatingsRpcService {
    save(dto: RatingDto): Promise<RatingInterface>;
    findById(dto: GetRatingDto): Promise<RatingInterface>;
    listAll(req: {}): Promise<RatingsResponseInterface>;
    listAllByType(dto: GetRatingTypeDto): Promise<RatingsResponseInterface>;
    findByIdStream(upstream: Observable<GetRatingDto>): Promise<Observable<RatingInterface>>;
}