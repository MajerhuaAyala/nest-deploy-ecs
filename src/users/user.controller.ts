import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from '../auth/decorator';
import { Encrypt } from '../utils/encrypt';
import { JoiValidationPipe } from './joi-validation.pipe';
import { createUserSchema } from './users.schema';

@Controller('users')
export class UserController {
  constructor(private userService: UsersService) {
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Public()
  async signup(@Body(new JoiValidationPipe(createUserSchema)) signUpDto: Record<string, string>) {
    const encrypt = new Encrypt();
    const encryptPassword = await encrypt.encrypt(signUpDto.password);
    return await this.userService.save(
      signUpDto.name,
      signUpDto.email,
      encryptPassword,
    );
  }
}