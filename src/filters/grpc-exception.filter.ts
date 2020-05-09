import {Catch, ArgumentsHost, HttpException, ExceptionFilter} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(HttpException)
export class GRpcExceptionFilter implements ExceptionFilter<HttpException> {
    catch(exception: HttpException, host: ArgumentsHost) {
        throw new RpcException(exception.message);
    }
}