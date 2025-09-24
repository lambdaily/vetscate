import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Room } from '../../room/entities/room.entity';
import { User } from '../../user/entities/user.entity';

@Entity('reservation')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, { eager: true })
  room: Room; // generará la FK roomId

  @ManyToOne(() => User, { eager: true })
  user: User; // generará la FK userId

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ type: 'datetime' })
  endTime: Date;
}
