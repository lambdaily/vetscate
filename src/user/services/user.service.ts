import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { AppLogger } from '../../config/app.logger';
import { ServiceBase } from '../../config/base/service.base';
import { SessionService } from '../../config/base/session.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRole } from '../entities/user-role.entity';
import { RoleService } from './role.service';

@Injectable()
export class UserService extends ServiceBase {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
    readonly appLogger: AppLogger,
    readonly sessionService: SessionService,
  ) {
    super(appLogger, sessionService, UserService.name);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { roleIds, ...user } = createUserDto;

    const newUser = await this.userRepository.save({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    });

    const userRoles = await Promise.all(
      roleIds.map(async (roleId: number) => {
        const role = await this.roleService.findOne(roleId);

        return this.userRoleRepository.create({
          user: newUser,
          role,
        });
      }),
    );

    await this.userRoleRepository.save(userRoles);

    return newUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async findOneWithRoles(id: number): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepository.remove(user);
  }

  onlyAdmin() {
    this.sessionService.setFunction(this.getFunctionName(this.onlyAdmin));
    return 'Only Admin can see this message';
  }
}
