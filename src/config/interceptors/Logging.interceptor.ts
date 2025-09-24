import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../user/entities/user.entity';
import { AppLogger } from '../app.logger';
import { SessionService } from '../base/session.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly appLogger: AppLogger,
    private readonly sessionService: SessionService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const user: User = context.getArgs()[0].user
      ? context.getArgs()[0].user
      : null;
    const uuid = uuidv4();
    this.sessionService.setTX(uuid);
    this.sessionService.setController(context.getClass().name);
    this.sessionService.setUser(user);
    this.sessionService.setContext(context);

    this.appLogger.info('Start...');
    // context method
    this.appLogger.info(
      `Method: ${context.switchToHttp().getRequest().method}`,
    );
    this.appLogger.info(`Path: ${context.switchToHttp().getRequest().url}`);
    //TODO: Hacer que el body muestre los datos en formato multipart/form-data
    this.appLogger.info(
      `Body: ${JSON.stringify(context.switchToHttp().getRequest().body)}`,
    );
    this.appLogger.info(
      `Params: ${JSON.stringify(context.switchToHttp().getRequest().query)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      catchError(err => {
        this.appLogger.error(err);
        return throwError(() => err);
      }),
      finalize(() => this.appLogger.info(`End... ${Date.now() - now}ms`)),
    );
  }
}
