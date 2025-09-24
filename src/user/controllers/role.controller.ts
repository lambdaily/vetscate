import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';

import { CreateRoleDto } from '../dtos/create-role.dto';
import { RoleService } from '../services/role.service';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({ status: 201, description: 'Role created' })
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return await this.roleService.createRole(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List roles' })
  @ApiResponse({ status: 200, description: 'Roles list' })
  async findAll() {
    return await this.roleService.findAll();
  }
}
