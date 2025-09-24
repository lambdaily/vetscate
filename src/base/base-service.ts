import { BadGatewayException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { BaseEntity } from './entities/base.entity';
import { IBaseService } from './interfaces/base-service.interface';


@Injectable()
export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async getAll(): Promise<T[]> {
    try {
      return await this.genericRepository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  get(id: number): Promise<T> {
    throw new Error('Method not implemented.' + id);
  }
  update(entity: T): Promise<T> {
    throw new Error('Method not implemented.' + entity);
  }
  delete(id: number): void {
    throw new Error('Method not implemented.' + id);
  }

  async create(entity: T): Promise<T> {
    try {
      const record = this.genericRepository.create(entity);
      return await this.genericRepository.save(record);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
