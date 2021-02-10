import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const authJwtToken = req.headers.authorization;

    if(!authJwtToken)
    {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, process.env.JWT_SECRET);
      req["user"] = user;
      next()
    } catch (error) {
      return new UnauthorizedException();
    }
  }
}
