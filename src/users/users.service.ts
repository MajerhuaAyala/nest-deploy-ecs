import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async save(name: string, email: string, password: string) {
    return await this.userRepository.save({
      name,
      email,
      password,
    });
  }
}
