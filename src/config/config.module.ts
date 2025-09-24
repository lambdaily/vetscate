import { Module } from '@nestjs/common';

import { AppLogger } from './app.logger';
import { SessionService } from './base/session.service';

@Module({
  providers: [AppLogger, SessionService],
  exports: [AppLogger, SessionService],
})
export class ConfigModule {}
