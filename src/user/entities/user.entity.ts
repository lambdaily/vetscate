import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserRole } from './user-role.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: 'text', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'text', nullable: false })
  lastName: string;

  @Column({ type: 'text', nullable: false, unique: true })
  email: string;

  @Column({ type: 'text', nullable: false })
  phone: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => UserRole, userRole => userRole.user)
  userRoles: UserRole[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
