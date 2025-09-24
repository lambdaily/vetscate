import { AppLogger } from '../app.logger';
import { SessionService } from './session.service';

export class ServiceBase {
  LOG: AppLogger;

  constructor(
    readonly appLogger: AppLogger,
    readonly sessionService: SessionService,
    private readonly serviceName: string,
  ) {
    this.sessionService.setService(this.serviceName);
    this.LOG = this.appLogger;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  getFunctionName(fn: Function): string {
    return fn?.name;
  }
}
