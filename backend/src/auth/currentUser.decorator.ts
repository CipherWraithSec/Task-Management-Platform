import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const getCurrentUserByContext = (context: ExecutionContext) => {
  return context.switchToHttp().getRequest().user;
};

// The user of the current request is extracted and supplied to this param decorator
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
