// filepath: src/reservations/reservations.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Room } from '../room/entities/room.entity';
import { User } from '../user/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(
    createReservationDto: CreateReservationDto,
    user: User,
  ): Promise<Reservation> {
    const { roomId, startTime, endTime } = createReservationDto;

    if (new Date(endTime) <= new Date(startTime)) {
      throw new BadRequestException('endTime must be after startTime');
    }

    // usar la FK generada por TypeORM: roomId
    const overlapping = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.roomId = :roomId', { roomId })
      .andWhere('reservation.endTime > :startTime', { startTime })
      .andWhere('reservation.startTime < :endTime', { endTime })
      .getOne();

    if (overlapping) {
      throw new BadRequestException(
        'Room is already reserved for this time slot',
      );
    }

    const room = await this.roomRepository.findOneBy({ id: roomId });
    if (!room) throw new BadRequestException('Room not found');

    const reservation = this.reservationRepository.create({
      room,
      user,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    });

    return this.reservationRepository.save(reservation);
  }

  async findByUser(user: User): Promise<Reservation[]> {
    return this.reservationRepository.find({
      where: { user: { id: user.id } },
      relations: ['room'],
      order: { startTime: 'ASC' },
    });
  }
}
