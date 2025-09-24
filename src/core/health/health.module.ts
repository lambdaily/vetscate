import { Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  providers: [HealthService],
  imports: [LoggerModule],
  controllers: [HealthController],
})
export class HealthModule {}
