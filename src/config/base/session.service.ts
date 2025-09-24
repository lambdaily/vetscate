import { ExecutionContext, Injectable, Scope } from '@nestjs/common';

import { User } from '../../user/entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
  private user: User;
  private controller: string;
  private service: string;
  private function: string;
  private context: ExecutionContext;
  private TX: string;

  setUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  setController(controller: string) {
    this.controller = controller;
  }

  getController(): string {
    return this.controller;
  }

  setService(service: string) {
    this.service = service;
  }

  getService(): string {
    return this.service;
  }

  setFunction(functionName: string) {
    this.function = functionName;
  }

  getFunction(): string {
    return this.function;
  }

  setContext(context: ExecutionContext) {
    this.context = context;
  }

  getContext(): ExecutionContext {
    return this.context;
  }

  setTX(tx: string) {
    this.TX = tx;
  }

  getTX(): string {
    return this.TX;
  }
}
