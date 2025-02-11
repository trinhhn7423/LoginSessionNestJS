import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // console.log(response);
    const request = ctx.getRequest<Request>();
    // console.log(request);
    const status = exception.getStatus();
    // console.log('In HttpExceptionFilter', exception.getResponse());

    if (status === 400 && exception.getResponse() instanceof Object) {
      const validationErrors = exception.getResponse() as { message: string[] };
      response.status(status).json({
        statusCode: status,
        message: validationErrors.message,
        timestamp: new Date(),
        path: request.url,
      });
    } else {
      // Xử lý các loại lỗi khác
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date(),
        path: request.url,
      });
    }
  }
}
