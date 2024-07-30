import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Encrypt } from '../utils/encrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const encrypt = new Encrypt();
    const isValidPassword = await encrypt.compare(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = user;

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
