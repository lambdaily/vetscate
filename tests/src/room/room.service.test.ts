import { Repository } from 'typeorm';

import { Room } from '../../../src/room/entities/room.entity';
import { RoomService } from '../../../src/room/room.service';

describe('RoomService', () => {
  let service: RoomService;
  let roomRepository: jest.Mocked<Repository<Room>>;

  beforeEach(() => {
    roomRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    } as any;
    service = new RoomService(roomRepository);
  });

  it('should create a room', async () => {
    const dto = { name: 'Sala 1', capacity: 10 };
    const roomEntity = { id: 1, ...dto };
    roomRepository.create.mockReturnValue(roomEntity);
    roomRepository.save.mockResolvedValue(roomEntity);

    const result = await service.create(dto);
    expect(roomRepository.create).toHaveBeenCalledWith(dto);
    expect(roomRepository.save).toHaveBeenCalledWith(roomEntity);
    expect(result).toEqual(roomEntity);
  });

  it('should return all rooms', async () => {
    const rooms = [{ id: 1, name: 'Sala 1', capacity: 10 }];
    roomRepository.find.mockResolvedValue(rooms);

    const result = await service.findAll();
    expect(roomRepository.find).toHaveBeenCalled();
    expect(result).toEqual(rooms);
  });
});
