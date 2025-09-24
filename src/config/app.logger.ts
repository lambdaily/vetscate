import { Injectable, Logger, Scope } from '@nestjs/common';

import { SessionService } from './base/session.service';

@Injectable({ scope: Scope.REQUEST })
export class AppLogger {
  constructor(
    private readonly logger: Logger,
    private readonly sessionService: SessionService,
  ) {}

  private logWithlogInfo(level: string, message: any) {
    if (typeof message === 'object') {
      message = JSON.stringify(message);
    }

    let circuitInfo;
    const controlerInfo = this.sessionService.getController()
      ? `${this.sessionService.getController()}`
      : '';
    const serviceInfo = this.sessionService.getService()
      ? `.${this.sessionService.getService()}`
      : '';
    const functionInfo = this.sessionService.getFunction()
      ? `.${this.sessionService.getFunction()}`
      : '';

    if (controlerInfo || serviceInfo || functionInfo) {
      circuitInfo = `[${controlerInfo}${serviceInfo}${functionInfo}]`;
    }

    const userId: number | string = this.sessionService.getUser()?.id
      ? `userId: ${this.sessionService.getUser().id} `
      : '';
    const userFirstName: string = this.sessionService.getUser()?.firstName
      ? `username: ${this.sessionService.getUser().firstName}`
      : '';

    const userInfo = `${userId}${userFirstName}`;
    const logInfo = `[TX:${this.sessionService.getTX()}] ${circuitInfo} ${userInfo}`;

    switch (level) {
      case 'error':
        this.logger.error(`${logInfo} | ${message}`);
        break;
      case 'warn':
        this.logger.warn(`${logInfo} | ${message}`);
        break;
      case 'info':
        this.logger.log(`${logInfo} | ${message}`);
        break;
      case 'debug':
        this.logger.debug(`${logInfo} | ${message}`);
        break;
      case 'verbose':
        this.logger.verbose(`${logInfo} | ${message}`);
        break;
    }
  }

  error(message: any) {
    this.logWithlogInfo('error', message);
  }

  warn(message: any) {
    this.logWithlogInfo('warn', message);
  }

  info(message: any) {
    this.logWithlogInfo('info', message);
  }

  debug(message: any) {
    this.logWithlogInfo('debug', message);
  }

  verbose(message: any) {
    this.logWithlogInfo('verbose', message);
  }
}
