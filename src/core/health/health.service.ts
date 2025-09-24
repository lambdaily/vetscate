import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { EnvConfiguration } from '../config/env.config';

@Injectable()
export class HealthService {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async ping() {
    const data = await this.dataSource.query('SELECT now()');
    const env = EnvConfiguration();
    const resp = {
      message: `env: ${env.environment} ,date: ${data[0].now}`,
    };
    return resp;
  }
}
