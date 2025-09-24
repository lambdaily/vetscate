import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../base/entities/base.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_role')
export class UserRole extends BaseEntity {
  @ManyToOne(() => User, user => user.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Role, role => role.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
