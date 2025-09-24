import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRole, Role]),
    ConfigModule,
    PassportModule,
  ],
  providers: [UserService, RoleService],
  controllers: [UserController, RoleController],
  exports: [UserService, TypeOrmModule, RoleService],
})
export class UserModule {}
