import { NestMiddleware } from '@nestjs/common';

export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log('here');
    if (!req.session || !req.session.userData) {
      console.log('userData', req.session.userData);
      return res.status(401).json({ message: 'Session not found' });
    }
    next();
  }
}
