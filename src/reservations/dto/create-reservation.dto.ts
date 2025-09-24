import { IsDateString, IsInt } from 'class-validator';

export class CreateReservationDto {
  @IsInt()
  roomId: number;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
