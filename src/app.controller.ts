import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @Public()
  getHello(): string {
    return this.appService.getHello();
  }
}
