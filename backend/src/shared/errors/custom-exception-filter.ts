/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ArgumentsHost, Catch, HttpException, Logger, NotFoundException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { BaseError } from './base-error.abstract';

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
        const response: Response = ctx.getResponse();

        if (exception instanceof BaseError) {
            this.handleBaseErrorException(exception, response);
        } else if (exception instanceof QueryFailedError) {
            this.handleTypeOrmException(exception, response);
        } else if (exception instanceof HttpException) {
            this.handleHttpException(exception, response);
        } else {
            console.log('Unhandled exception:', exception);
            super.catch(exception, host);
        }
    }

    private handleBaseErrorException(exception: BaseError, response: Response) {
        this.logger.error(exception);

        const { code, message, errors } = exception;

        console.log("errors: ", errors)

        const error = {
            message,
            details: errors || {
                statusCode: code,
                type: exception instanceof Error ? exception.name : 'UnknownException',
                timestamp: new Date().toISOString(),
            }
        };

        response.status(code).json({ error });
    }

    private handleTypeOrmException(exception: QueryFailedError, response: Response) {
        this.logger.error(exception.message, exception.stack);

        let status = 500;
        let message = 'Internal server error';

        if (exception.message.includes('invalid input syntax for type uuid')) {
            status = 400;
            message = 'Invalid UUID';
        } else if ((exception as any).code === '23505') {
            status = 409;
            message = 'Duplicate key value violates unique constraint';
        } else if ((exception as any).code === '23503') {
            status = 400;
            message = 'Insert or update violates foreign key constraint';
        }

        const error = {
            message,
            details: {
                statusCode: status,
                type: exception instanceof Error ? exception.name : 'UnknownException',
                timestamp: new Date().toISOString(),
            }
        };

        response.status(status).json({ error });
    }

    private handleHttpException(exception: HttpException, response: Response) {
        const status = exception.getStatus();
        const res: any = exception.getResponse();

        const message =
            typeof res === 'string'
                ? res
                : res?.message || 'Unexpected error';

        const error = {
            message,
            details: {
                statusCode: status,
                type: exception.name || 'HttpException',
                timestamp: new Date().toISOString(),
                errors: res?.errors ?? undefined,
            }
        };

        response.status(status).json({ error });
    }
}
