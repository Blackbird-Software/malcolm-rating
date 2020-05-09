import {RatingType} from './rating-type';
import {NotImplementedException} from '@nestjs/common';

export default class RatingTypeConverter {
    static fromIntToRatingType(value: number): string {
        switch (value) {
            case 0:
                return RatingType.BOOK;
            case 1:
                return RatingType.MOVIE;
            default:
                throw new NotImplementedException('Unknown RatingType given. ');
        }
    }
}