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

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDto, @Session() session: Record<string, any>) {
    return await this.authService.login(
      { username: body.username, password: body.password },
      session,
    );
  }

  @Post('register')
  async createUser(@Body() body: CreateUserDto) {
    return await this.authService.createUser(body);
  }

  @Get('session')
  getSession(@Session() session: Record<string, any>, @Res() res: Response) {
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
    @Query('role') role: string,
  ) {
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
