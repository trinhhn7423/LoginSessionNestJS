import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  Session,
  SetMetadata,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService, userSessionType } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { AuthGuard } from './auth.guard';

@Controller({ version: '1', path: '/auth' })
@UseInterceptors(ClassSerializerInterceptor) //tự động biến đổi  dữ liệu trả về từ controller trước khi gửi cho client.
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Session() session: Record<string, any>) {
    return await this.authService.login(
      { email: body.email, password: body.password, phone: body.phone },
      session,
    );
  }

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  roleDepartment = ['MANAGER', 'DEPARTMENT'];

  @SetMetadata('roles', ['MANAGER'])
  @UseGuards(AuthGuard)
  @Post('employee')
  createEmployee(
    @Body() body: CreateEmployeeDto,
    @Session() session: Record<string, userSessionType>,
  ) {
    return this.authService.createEmployee(body, session);
  }

  // @UseGuards(AuthGuard)
  @Get('employee')
  getAllEmployeeByIdManager(
    // @Param('id') id: number,
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role: string,
    @Query('crateAt') createAt: string,
    @Query('status') status: number,
    @Session() session: Record<string, userSessionType>,
  ) {
    return this.authService.getAllEmployeeByIdManager(
      // id,
      search,
      page,
      limit,
      role,
      createAt,
      status,
      session,
    );
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>, @Res() res: Response) {
    try {
      const sessionUser = session.userData;
      // console.log('sessionUser', sessionUser);
      // console.log('session.id get', session.id);
      if (sessionUser) {
        res.json(sessionUser);
      } else {
        res.status(401).json({ message: 'No active session' });
      }
    } catch {
      console.log('error');
    }
  }

  @Get('logout')
  clearSession(
    @Req() req: Request,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    try {
      session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          return res.status(500).json({ message: 'Failed to clear session' });
        }

        res.clearCookie('SESSION_TWICE', { path: '/' });
        return res
          .status(200)
          .json({ message: 'Session cleared successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  }

  @UseGuards(AuthGuard)
  @Get('users')
  getAllUser(
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role: string,
    @Query('crateAt') createAt: string,
  ) {
    return this.authService.getAllUser(search, page, limit, role, createAt);
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  editUser(@Param('id') id: number, @Body() body: EditUserDto) {
    return this.authService.editUser(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
