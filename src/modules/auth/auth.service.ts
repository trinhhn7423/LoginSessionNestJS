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
import { plainToClass, plainToInstance } from 'class-transformer';

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
      console.log(e);
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllUser(page?: number, limit?: number, role?: 'user' | 'admin') {
    const users: AuthEntity[] = await this.authRepository.find({
      skip: page,
      take: limit,
      where: { role: role },
    });
    return plainToClass(AuthEntity, users);
  }

  async editUser(id: number, data: EditUserDto) {
    try {
      const findID = await this.authRepository.findOneBy({ id: id });
      console.log(data);
      if (findID) {
        await this.authRepository.save({
          id: findID.id,
          firstname: data.firstname,
          lastname: data.lastname,
          updated_at: new Date(),
        });
        return { message: 'Edit user successfully' };
      }
      throw new NotFoundException('User not found ');
    } catch (e) {
      console.log(e);
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
      const save = await this.authRepository.save({
        ...data,
        password: hash,
        created_at: new Date(),
      });

      return {
        message: 'User created successfully',
        data: plainToInstance(AuthEntity, save),
      };
    } catch (error) {
      console.log(error.status);
      if (error.status !== 500) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(idUser: number) {
    try {
      return await this.authRepository.softDelete(idUser);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
