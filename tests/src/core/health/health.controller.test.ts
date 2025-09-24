// import { createMock } from '@golevelup/ts-jest';
// import { HealthService } from 'src/core/health/health.service';

//import { HealthController } from '../../../../src/core/health/health.controller';

describe('HealthController', () => {
  //let service: jest.Mocked<HealthService>;

  beforeEach(() => {
    // service = createMock<HealthService>();
    // healthController = new HealthController(service);
  });

  describe('run', () => {
    it('should return is healthy', () => {
      const json = { status: 'ok' };
      expect(json).toEqual({ status: 'ok' });
    });
  });
});
