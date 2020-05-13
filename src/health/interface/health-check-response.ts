import {ServingStatus} from './serving-status.enum';

export default interface HealthCheckResponse {
    status: ServingStatus;
}