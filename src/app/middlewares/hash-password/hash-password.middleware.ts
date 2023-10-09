import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashPasswordMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.password) {
      const saltRounds: number = 11;
      const hashedPassword: string = await bcrypt.hash(
        req.body.password,
        saltRounds,
      );
      req.body.password = hashedPassword;
    }
    next();
  }
}
