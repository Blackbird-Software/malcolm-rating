import {Controller, Get} from '@nestjs/common';
import {
    DiskHealthIndicator,
    GRPCHealthIndicator,
    HealthCheck,
    HealthCheckService,
    MemoryHealthIndicator,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import {join} from 'path';

@Controller('health_check')
export class HealthController {

    constructor(
        private healthCheckService: HealthCheckService,
        private typeOrmHealthIndicator: TypeOrmHealthIndicator,
        private diskHealthIndicator: DiskHealthIndicator,
        private memoryHealthIndicator: MemoryHealthIndicator,
        private gRpcHealthIndicator: GRPCHealthIndicator
    ) {
    }

    @Get()
    @HealthCheck()
    async readiness() {
        return this.healthCheckService.check([
            () => this.typeOrmHealthIndicator.pingCheck('database', {timeout: 300}),
            () => this.diskHealthIndicator.checkStorage('storage', {thresholdPercent: 0.9, path: '/'}),
            () => this.memoryHealthIndicator.checkHeap('memory_rss', 250 * 1024 * 1024),
            () => this.gRpcHealthIndicator.checkService('grpc_service', 'whatever', {
                package: 'health',
                healthServiceName: 'HealthRpcService',
                protoPath: join(__dirname, '/../health.proto'),
            }),
        ]);
    }
}