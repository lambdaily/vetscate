import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('int')
  capacity: number;
}
