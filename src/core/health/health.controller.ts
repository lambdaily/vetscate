import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

import { HealthService } from './health.service';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Ping' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  ping() {
    return {
      status: 'ok',
      date: new Date().toISOString(),
    };
  }

  @Get('test')
  @HttpCode(200)
  @ApiOperation({ summary: 'Test simple endpoint' })
  @ApiResponse({ status: 200, description: 'Simple ok' })
  test() {
    return { status: 'ok' };
  }
}
