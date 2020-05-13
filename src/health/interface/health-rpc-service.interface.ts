import HealthCheckResponse from './health-check-response';
import HealthCheckRequest from './health-check-request';

export default interface HealthRpcService {
    check(req: HealthCheckRequest): HealthCheckResponse;
}