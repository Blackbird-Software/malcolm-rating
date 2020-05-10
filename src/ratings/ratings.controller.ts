import {ClientGrpc, GrpcMethod, GrpcStreamMethod, RpcException} from '@nestjs/microservices';
import {
    BadRequestException,
    Controller,
    Inject,
    OnModuleInit,
    UseFilters,
    UsePipes,
    ValidationError,
    ValidationPipe
} from '@nestjs/common';
import {RatingDto} from './dto/rating.dto';
import RatingsRpcService from './interfaces/ratings-rpc-service.interface';
import {RatingsService} from './ratings.service';
import {RatingInterface} from './rating.interface';
import {GetRatingDto} from './dto/get-rating.dto';
import GetRatingTypeDto from './dto/get-rating-type.dto';
import RatingTypeConverter from './enum/rating-type-converter';
import {GRpcExceptionFilter} from '../filters/grpc-exception.filter';
import {Observable, ReplaySubject, Subject} from "rxjs";

@Controller()
@UseFilters(new GRpcExceptionFilter())
@UsePipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) =>
        new RpcException('Validation error occurred. ')
}))
export class RatingsController implements OnModuleInit {

    private ratingsRpcService: RatingsRpcService;

    constructor(
        @Inject('RATINGS_PACKAGE') private readonly client: ClientGrpc,
        private readonly ratingsService: RatingsService
    ) {
    }

    onModuleInit() {
        this.ratingsRpcService = this.client.getService<RatingsRpcService>('RatingsRpcService');
    }

    @GrpcMethod('RatingsRpcService')
    save(dto: RatingDto): Promise<RatingInterface> {
        return this.ratingsService.create(dto);
    }

    @GrpcMethod('RatingsRpcService')
    findById(dto: GetRatingDto, metadata: any): Promise<RatingInterface> {
        const {id} = dto;
        return this.ratingsService.findById(id);
    }

    @GrpcMethod('RatingsRpcService')
    async listAll(): Promise<any> {
        const ratings = await this.ratingsService.findAll();
        return {items: ratings};
    }

    @GrpcMethod('RatingsRpcService')
    async listAllByType(dto: GetRatingTypeDto, metadata: any): Promise<any> {
        const type = RatingTypeConverter.fromIntToRatingType(dto.type);
        const ratings = await this.ratingsService.findByType(type);

        return {items: ratings};
    }

    @GrpcStreamMethod('RatingsRpcService')
    async findByIdStream(messages: Observable<GetRatingDto>): Promise<Observable<any>> {
        console.log(messages, 't');
        console.log(typeof messages, 'm.t');
        const s = new Subject();
        const o = s.asObservable();
        messages.subscribe(async (dto: GetRatingDto) => {
            const item = await this.ratingsService.findById(dto.id);
            s.next(item);
        });
        return o;
    }
}