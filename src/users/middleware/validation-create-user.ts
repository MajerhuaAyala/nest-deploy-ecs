import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

@Injectable()
export class ValidationCreateUser implements NestMiddleware {
  constructor(private readonly schema: Schema) {
  }

  use(req: Request, res: Response, next: NextFunction): any {

    const error = this.schema.validate(req.body);

    if (error) {
      // @ts-ignore
      throw new BadRequestException(error.message);
    }

    next();
  }

}