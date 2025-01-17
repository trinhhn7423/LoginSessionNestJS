import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { EditUserDto } from './dto/editUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res() res: Response,
    @Session() session: Record<string, any>,
  ) {
    // session.userData = '123';
    // console.log('');
    // console.log('req.body', req.session);

    const resultLogin = await this.authService.login({
      username: body.username,
      password: body.password,
    });
    if (resultLogin) {
      session.userData = {
        id: resultLogin.id,
        username: resultLogin.username,
        role: resultLogin.role,
      };
      console.log('session.id login', session.id);
      res
        .status(201)
        .json({ message: 'Login successfully', data: resultLogin });
    } else {
      res
        .status(401)
        .json({ message: 'Username not found or password is incorrect' });
    }
  }

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>, @Res() res: Response) {
    // if (sessionUser) {
    //   res.json(sessionUser);
    // } else {
    //   res.status(401).json({ message: 'No active session' });
    // }
    try {
      const sessionUser = session.userData;
      console.log('sessionUser', sessionUser);
      console.log('session.id get', session.id);
      if (sessionUser) {
        res.json(sessionUser);
      } else {
        res.status(401).json({ message: 'No active session' });
      }
    } catch {
      console.log('error');
    }
  }

  @Get('clear_session')
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

        res.clearCookie('mycookie', { path: '/' });
        return res
          .status(200)
          .json({ message: 'Session cleared successfully' });
      });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'An error occurred' });
    }
  }

  @Get('users')
  getAllUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('role') role: 'user' | 'admin',
  ) {
    // console.log(`${page} , ${limit}`);
    return this.authService.getAllUser(page, limit, role);
  }

  @Post('edit/:id')
  editUser(@Param('id') id: number, @Body() body: EditUserDto) {
    return this.authService.editUser(id, body);
  }

  @Delete('delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }
}
