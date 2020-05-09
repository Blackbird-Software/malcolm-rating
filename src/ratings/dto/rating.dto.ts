import {IsInt, IsNotEmpty, Max, Min} from 'class-validator';

export class RatingDto {
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(10)
    readonly value: number;

    @IsNotEmpty()
    readonly comment: string;

    @IsNotEmpty()
    @IsInt()
    readonly type: number;
}
