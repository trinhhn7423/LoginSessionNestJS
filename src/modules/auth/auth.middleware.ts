import { Request, Response, NextFunction } from 'express';
import { Session } from 'express-session';
import { Injectable, NestMiddleware } from '@nestjs/common';

// import { Session } from '@nestjs/common';

// export function checkSession(
//   req: Request,
//   res: Response,
//   session: Session,
//   next: NextFunction,
// ) {
//   console.log('session', session);
//   next();
// }
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    if (!req.session || !req.session.userData) {
      return res.status(401).json({ message: 'Session not found' });
    }
    next();
  }
}

// { checkSession };
