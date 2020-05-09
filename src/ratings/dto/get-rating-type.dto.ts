import {IsInt, IsNotEmpty} from 'class-validator';

export default class GetRatingTypeDto {
    @IsNotEmpty()
    @IsInt()
    readonly type: number;
}