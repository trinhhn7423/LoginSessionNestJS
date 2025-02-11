import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, Like, FindOptionsWhere } from 'typeorm';
import { AuthEntity } from './auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { RoleEntity } from '../role/role.entity';
import { CreateEmployeeDto } from './dto/createEmployee.dto';

interface userSessionType {
  id: number;
  email: string;
  fullName: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // handleCron() {
  //   console.log('Task chạy mỗi phút: ', new Date());
  // }

  async login(
    data: LoginDto,
    session: Record<string, userSessionType>,
  ): Promise<{ message: string; data: AuthEntity }> {
    const user = await this.authRepository.findOne({
      where: {
        email: data.email,
        phone: data.phone,
        isDelete: false,
      },
      relations: ['manager', 'role'],
    });
    if (!user) {
      throw new HttpException(
        'Username not found or password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (isMatch == true) {
      session.userData = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role.name,
      };
      return {
        message: 'Login successfully',
        data: user,
      };
    } else {
      throw new HttpException(
        'Username not found or password is incorrect',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async getAllUser(
    search?: string,
    page: number = 0,
    limit: number = 10,
    role?: string,
    createAt?: string,
  ) {
    const date = new Date(createAt);
    console.log(date);
    const whereCondition: FindOptionsWhere<AuthEntity>[] = [];
    if (role) {
      const findRole = await this.roleRepository.findOne({
        where: { name: role },
      });
      if (findRole) whereCondition.push({ role: findRole });
    }
    console.log('whereCondition', whereCondition);
    if (createAt) whereCondition.push({ created_at: date });

    if (search) {
      whereCondition.push(
        { email: Like(`%${search}%`) }, /// tìm chứa email
        { phone: Like(`%${search}%`) },
        { fullName: Like(`%${search}%`) },
      );
    }
    console.log('whereCondition', whereCondition);
    const users: AuthEntity[] = await this.authRepository.find({
      skip: page,
      take: limit,
      where: whereCondition,
      withDeleted: false,
      order: { created_at: 'DESC' },
    });
    return users;
  }

  async createEmployee(body: CreateEmployeeDto, id: number) {
    const manager = await this.authRepository.findOne({ where: { id } });
    if (manager.role.name == 'MANAGER') {
      const role = await this.roleRepository.findOne({
        where: { id: body.id_role },
      });
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      const slatRound = 10;
      const hash = await bcrypt.hash(body.password, slatRound);
      const user = this.authRepository.create({
        password: hash,
        fullName: body.fullname,
        phone: body.phone,
        address: body.address,
        role: role,
        manager: manager,
        status: body.status,
      });
      await this.authRepository.save(user);
      return user;
    } else {
      throw new HttpException('You are not manager', HttpStatus.FORBIDDEN);
    }
  }

  async getAllEmployeeByIdManager(id: number) {
    const user = await this.authRepository.findOne({
      where: { id: id },
      relations: ['manager'],
    });
    // console.log('user', user);
    if (user?.role?.name == 'MANAGER') {
      console.log('go here');
      return await this.authRepository.find({
        where: { manager: user },
      });
    }
    if (user?.manager?.role?.name == 'MANAGER') {
      console.log('go here2');

      return await this.authRepository.find({
        where: { manager: { id: user.id } },
      });
    }
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
    // updatedUser.firstname = data.firstname;
    // updatedUser.lastname = data.lastname;
    updatedUser.updated_at = new Date();
    await this.authRepository.save(updatedUser);
    return { message: 'Edit user successfully', data: updatedUser };
  }

  async createUser(
    data: CreateUserDto,
  ): Promise<{ message: string; data: AuthEntity }> {
    try {
      const findUser = await this.authRepository.findOne({
        where: {
          email: data.email,
          isDelete: false,
        },
      });
      if (findUser) {
        throw new HttpException(
          'Username already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const slatRound = 10;
      const hash = await bcrypt.hash(data.password, slatRound);
      const role = await this.roleRepository.findOne({
        where: { name: 'MANAGER' },
      });
      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }
      const user = this.authRepository.create({
        email: data.email,
        password: hash,
        fullName: data.fullname,
        role: role,
      });
      const savedUser = await this.authRepository.save(user);

      return {
        message: 'User created successfully',
        data: savedUser,
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
      const findDelete = await this.authRepository.findOneBy({ id: idUser });
      if (!findDelete) {
        throw new HttpException('Not found user', HttpStatus.NOT_FOUND);
      }
      findDelete.isDelete = true;
      await this.authRepository.save(findDelete);
      return findDelete;
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
