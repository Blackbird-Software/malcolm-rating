import {ClientGrpc, GrpcMethod, GrpcStreamMethod, RpcException} from '@nestjs/microservices';
import {
    Controller,
    Inject,
    OnModuleInit,
    UseFilters, UseGuards,
    UsePipes,
    ValidationError,
    ValidationPipe
} from '@nestjs/common';
import {RatingDto} from './dto/rating.dto';
import RatingsRpcService from './interface/ratings-rpc-service.interface';
import {RatingsService} from './ratings.service';
import {RatingInterface} from './interface/rating.interface';
import {GetRatingDto} from './dto/get-rating.dto';
import GetRatingTypeDto from './dto/get-rating-type.dto';
import RatingTypeConverter from './enum/rating-type-converter';
import {GRpcExceptionFilter} from '../filter/grpc-exception.filter';
import {Observable, Subject} from 'rxjs';
import RatingsResponseInterface from './interface/ratings-response.interface';
import {GrpcAuthGuard} from "../auth/jwt/grpc.guard";

@Controller()
@UseFilters(new GRpcExceptionFilter())
@UsePipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) =>
        new RpcException('Validation error occurred. ')
}))
@UseGuards(GrpcAuthGuard)
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
    async save(dto: RatingDto): Promise<RatingInterface> {
        return this.ratingsService.create(dto);
    }

    @GrpcMethod('RatingsRpcService')
    async findById(dto: GetRatingDto, metadata: any): Promise<RatingInterface> {
        return this.ratingsService.findById(dto.id);
    }

    @GrpcMethod('RatingsRpcService')
    async listAll(): Promise<RatingsResponseInterface> {
        const ratings = await this.ratingsService.findAll();
        return {items: ratings};
    }

    @GrpcMethod('RatingsRpcService')
    async listAllByType(dto: GetRatingTypeDto, metadata: any): Promise<RatingsResponseInterface> {
        const type = RatingTypeConverter.fromIntToRatingType(dto.type);
        const ratings = await this.ratingsService.findByType(type);

        return {items: ratings};
    }

    @GrpcStreamMethod('RatingsRpcService')
    async findByIdStream(messages: any, metadata: any): Promise<Observable<RatingInterface>> {
        const subject = new Subject<RatingInterface>();
        messages.subscribe({
            next: async (dto: GetRatingDto) => {
                const item = await this.ratingsService.findById(dto.id);
                subject.next(item);
            },
            error: (error: any) => {
                throw new RpcException('Could not process stream.')
            },
            complete: () => subject.complete()
        });

        return subject.asObservable();
    }
}