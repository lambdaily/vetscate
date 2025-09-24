import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { EnvConfiguration } from './core/config/env.config';
import { JoiValidationSchema } from './core/config/joi.validation';
import { HealthModule } from './core/health/health.module';
import { LoggerModule } from './core/logger/logger.module';
import { ReservationsModule } from './reservations/reservations.module';
import { RoomModule } from './room/room.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),

    LoggerModule,
    HealthModule,
    AuthModule,
    UserModule,
    RoomModule,
    ReservationsModule,
  ],
})
export class AppModule {}
