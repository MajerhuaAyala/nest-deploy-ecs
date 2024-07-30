import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export class Encrypt {
  async encrypt(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, passwordHashed: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordHashed);
  }
}