import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
  ) {}

  async login(data: LoginDto): Promise<AuthEntity> {
    try {
      const user = await this.authRepository.findOne({
        where: { username: data.username },
        withDeleted: false,
      });
      if (!user) {
        throw new HttpException(
          'Username not found or password is incorrect',
          HttpStatus.NOT_FOUND,
        );
      }
      const isMatch = await bcrypt.compare(data.password, user.password);
      if (isMatch == true) {
        const result = { ...user, password: undefined };
        return result;
      } else {
        throw new HttpException(
          'Username not found or password is incorrect',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      // console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllUser(page?: number, limit?: number, role?: 'user' | 'admin') {
    const users: AuthEntity[] = await this.authRepository.find({
      skip: page,
      take: limit,
      where: { role: role },
      withDeleted: false,
      order: { created_at: 'DESC' },
    });
    return plainToInstance(AuthEntity, users);
  }

  async editUser(id: number, data: EditUserDto) {
    try {
      const findID = await this.authRepository.findOneBy({ id: id });
      console.log(data);
      if (findID) {
        await this.authRepository.update(id, data);
        const updatedUser = await this.authRepository.findOneBy({ id });
        return { message: 'Edit user successfully', data: updatedUser };
      }
      throw new NotFoundException('User not found ');
    } catch (e) {
      // console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      const findUser = await this.authRepository.findOne({
        where: { username: data.username },
      });
      console.log('finuser', findUser);
      if (findUser) {
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const slatRound = 10;
      const hash = await bcrypt.hash(data.password, slatRound);
      const user = this.authRepository.create({
        ...data,
        password: hash,
      });
      const savedUser = await this.authRepository.save(user);

      return {
        message: 'User created successfully',
        data: plainToInstance(AuthEntity, savedUser),
      };
    } catch (error) {
      // console.log(error.status);
      if (error.status !== 500) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(idUser: number) {
    try {
      const findDelete = await this.authRepository.softDelete(idUser);
      if (findDelete) {
        throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
      }
      return;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
