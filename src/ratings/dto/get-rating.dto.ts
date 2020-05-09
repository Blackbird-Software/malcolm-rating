import {IsNotEmpty, IsUUID} from 'class-validator';

export class GetRatingDto {
    @IsNotEmpty()
    @IsUUID()
    readonly id: string;
}