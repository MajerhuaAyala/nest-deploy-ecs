import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { ObjectSchema } from 'joi';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationCreateUserSchema implements NestMiddleware {
  constructor(private readonly schema: ObjectSchema) {
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { error } = this.schema.validate(req.body);
    if (error) {
      throw new BadRequestException(error);
    }
    next();
  }
}