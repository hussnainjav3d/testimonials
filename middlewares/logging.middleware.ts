import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const start = Date.now();
    console.log(`${method} ${originalUrl} - Request received`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const { statusCode } = res;
      console.log(
        `[${DateTime.now().toFormat(`mm/dd/yyyy HH:mm:ss`)}] ${method} ${originalUrl} - Response sent with status ${statusCode} in ${duration}ms`,
      );
    });

    next();
  }
}
