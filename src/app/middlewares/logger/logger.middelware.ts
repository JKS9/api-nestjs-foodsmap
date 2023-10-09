import {
  Inject,
  Injectable,
  LoggerService,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as crypto from 'crypto';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl, headers, hostname }: Request = request;

    response.on('finish', () => {
      const {
        statusCode,
        statusMessage,
      }: Response<any, Record<string, any>> = response;
      const uuid: `${string}-${string}-${string}-${string}-${string}` =
        crypto.randomUUID();

      const createLog: {
        message: string;
        reqId: `${string}-${string}-${string}-${string}-${string}`;
        ip: string;
        hostname: string;
        method: string;
        originalUrl: string;
        version: string | string[];
        res: {
          statusCode: number;
          statusMessage: string;
        };
      } = {
        message: method,
        reqId: uuid,
        ip,
        hostname,
        method,
        originalUrl,
        version: headers.version,
        res: { statusCode, statusMessage },
      };

      this.logger.log(createLog);
    });

    next();
  }
}
