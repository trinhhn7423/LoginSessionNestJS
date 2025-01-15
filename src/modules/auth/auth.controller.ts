import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Res() res: Response, @Session() session) {
    // session.userData = '123';
    // console.log('');
    // console.log('req.body', req.session);
    const { username, password } = req.body;
    const resultLogin = await this.authService.login({
      username: username,
      password: password,
    });
    if (resultLogin) {
      session.userData = {
        id: resultLogin.id,
        username: resultLogin.username,
        role: resultLogin.role,
      };
      console.log('session.id login', session.id);
      // res.cookie('mycookie', session.id, {
      //   httpOnly: true,
      // });
      res
        .status(201)
        .json({ message: 'Login successfully', data: resultLogin });
    } else {
      res
        .status(401)
        .json({ message: 'Username not found or password is incorrect' });
    }
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
  getAllUser() {
    return this.authService.getAllUser();
  }
}
