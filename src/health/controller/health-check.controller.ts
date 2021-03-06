import {Controller, Inject, OnModuleInit} from '@nestjs/common';
import {ClientGrpc, GrpcMethod} from '@nestjs/microservices';
import HealthCheckRequest from '../interface/health-check-request';
import HealthCheckResponse from '../interface/health-check-response';
import {ServingStatus} from '../interface/serving-status.enum';
import HealthRpcService from '../interface/health-rpc-service.interface';

@Controller()
export class HealthCheckController implements OnModuleInit {

    private healthRpcService: HealthRpcService;

    constructor(@Inject('HEALTH_PACKAGE') private readonly client: ClientGrpc
    ) {}

    onModuleInit() {
        this.healthRpcService = this.client.getService<HealthRpcService>('HealthRpcService');
    }

    @GrpcMethod('HealthRpcService', 'Check')
    check(req: HealthCheckRequest, metadata: any): HealthCheckResponse {
        return {status: ServingStatus.SERVING};
    }
}
