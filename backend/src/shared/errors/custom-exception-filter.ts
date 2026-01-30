import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

/**
 * Custom exception filter class that extends the BaseExceptionFilter.
 * This filter logs the exception and then calls the parent's catch method.
 */
@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
    private readonly logger = new Logger('ExceptionsHandler');

    /**
     * Catches the exception and logs it using the logger.
     * Then calls the parent's catch method.
     *
     * @param exception - The exception to be caught.
     * @param host - The arguments host object.
     */
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? (exception.getResponse() as any).message || exception.message
                : 'Internal server error';

        const customErrorResponse = {
            message,
            details: {
                statusCode: status,
                type: exception instanceof Error ? exception.name : 'UnknownException',
                timestamp: new Date().toISOString(),
            }
        };

        response.status(status).json({ error: customErrorResponse });
    }
}
