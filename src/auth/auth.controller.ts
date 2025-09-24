import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { ApiBearerAuth } from '@nestjs/swagger';

import { CreateUserDto } from '../user/dtos/create-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User created', type: User })
  async registerUser(@Body() registerUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(registerUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive access token' })
  @ApiResponse({ status: 201, description: 'Logged in, returns accessToken' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Get('me')
  @Auth()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user (from token)' })
  @ApiResponse({ status: 200, description: 'Current user info', type: User })
  async getProfile(@GetUser() user: User) {
    return user;
  }
}
