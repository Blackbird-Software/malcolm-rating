import {Module} from '@nestjs/common';
import {HealthModule} from './health/health.module';
import {DatabaseOrmModule} from './database-orm.module';
import {RatingsModule} from './ratings/ratings.module';
import {AuthModule} from "./auth/auth.module";

@Module({
    imports: [
        DatabaseOrmModule(),
        HealthModule,
        RatingsModule,
        AuthModule
    ],
})

export class AppModule {
}
