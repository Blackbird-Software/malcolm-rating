import {Module} from '@nestjs/common';
import {HealthModule} from './health/health.module';
import {DatabaseOrmModule} from './database-orm.module';
import {RatingsModule} from './ratings/ratings.module';

@Module({
    imports: [
        DatabaseOrmModule(),
        HealthModule,
        RatingsModule,
    ],
})

export class AppModule {
}
