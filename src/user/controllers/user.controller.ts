import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

import { LoggingInterceptor } from '../../config/interceptors/Logging.interceptor';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('user')
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('/:userId')
  @ApiOperation({ summary: 'Get user by id with roles' })
  @ApiResponse({ status: 200, description: 'User found', type: User })
  async findUser(@Param('userId') id: string): Promise<User> {
    return this.usersService.findOneWithRoles(parseInt(id));
  }

  @Post('admin')
  @ApiOperation({ summary: 'Only admin example' })
  @ApiResponse({ status: 200, description: 'Only admin can see' })
  onlyAmin() {
    return this.usersService.onlyAdmin();
  }
}
