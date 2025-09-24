import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { BaseEntity } from './entities/base.entity';
import { IBaseService } from './interfaces/base-service.interface';

export class BaseController<T extends BaseEntity> {
  constructor(private readonly baseService: IBaseService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.baseService.getAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<T> {
    return this.baseService.get(id);
  }

  @Post()
  async create(@Body() entity: T): Promise<T> {
    return await this.baseService.create(entity);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    this.baseService.delete(id);
  }

  @Put()
  async update(@Body() entity: T): Promise<T> {
    return this.baseService.update(entity);
  }
}
