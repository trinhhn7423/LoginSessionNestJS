import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async login({ username, password }) {
    try {
      const user = await this.authRepository.findOne({
        where: { username: username },
      });

      if (!user) {
        throw new HttpException(
          'Username not found or password is incorrect',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log('isMatch', isMatch);
      if (isMatch == true) {
        const result = { ...user, password: undefined };
        return result;
      }
    } catch {
      throw new HttpException(
        'Username not found or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllUser() {
    return await this.authRepository.find();
  }
}
