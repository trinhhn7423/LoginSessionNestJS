import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthEntity, RoleUser } from './auth.entity';
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

  async login(
    data: LoginDto,
    session: Record<string, any>,
  ): Promise<{ message: string; data: AuthEntity }> {
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
      // console.log('TypeRoleEnum.USER', );
      if (isMatch == true) {
        session.userData = {
          id: user.id,
          username: user.username,
          role: user.role,
        };
        return {
          message: 'Login successfully',
          data: plainToInstance(AuthEntity, user),
        };
      } else {
        throw new HttpException(
          'Username not found or password is incorrect',
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async getAllUser(page?: number, limit?: number, role?: string) {
    const users: AuthEntity[] = await this.authRepository.find({
      skip: page,
      take: limit,
      where: { role: RoleUser[role?.toLowerCase()] },
      withDeleted: false,
      order: { created_at: 'DESC' },
    });
    return plainToInstance(AuthEntity, users);
  }

  async findById(id: number) {
    const user = await this.authRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found ');
    }
    return user;
  }

  async editUser(id: number, data: EditUserDto) {
    const updatedUser = await this.authRepository.findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    updatedUser.firstname = data.firstname;
    updatedUser.lastname = data.lastname;
    updatedUser.updated_at = new Date();
    await this.authRepository.save(updatedUser);
    return { message: 'Edit user successfully', data: updatedUser };
  }

  async createUser(
    data: CreateUserDto,
  ): Promise<{ message: string; data: AuthEntity }> {
    try {
      const findUser = await this.authRepository.findOne({
        where: { username: data.username },
      });
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
