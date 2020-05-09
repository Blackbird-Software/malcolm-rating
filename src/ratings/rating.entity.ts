import {BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';
import {RatingInterface} from './rating.interface';

@Entity('ratings')
export class Rating extends BaseEntity implements RatingInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'text'})
    comment: string;

    @Index()
    @Column()
    type: string;

    @Column({type: 'smallint'})
    value: number;
}