import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';

const client = new SQSClient({});
const SQS_QUEUE_URL =
  'https://sqs.us-east-2.amazonaws.com/905418036958/SQS-CREATE-USER';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async save(name: string, email: string, password: string) {
    const command = new SendMessageCommand({
      QueueUrl: SQS_QUEUE_URL,
      DelaySeconds: 10,
      MessageAttributes: {
        Title: {
          DataType: 'String',
          StringValue: 'The Whistler',
        },
        Author: {
          DataType: 'String',
          StringValue: 'John Grisham',
        },
        WeeksOn: {
          DataType: 'Number',
          StringValue: '6',
        },
      },
      MessageBody:
        'Information about current NY Times fiction bestseller for week of 12/11/2016.',
    });
    await client.send(command);
    return await this.userRepository.save({
      name,
      email,
      password,
    });
  }
}
