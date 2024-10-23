import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export interface UserSession {
  sub: string;
  accountId: string;
  email: string;
  name: string;
}

export const UserSession = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserSession => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
