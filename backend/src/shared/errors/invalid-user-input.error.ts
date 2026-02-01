import { HttpStatus } from '@nestjs/common';
import * as joi from 'joi';
import { BaseError, IErrorDetail } from './base-error.abstract';
import { capitalize } from '../utils';

/**
 * Represents an error that occurs when the user provides invalid input.
 */
export class InvalidUserInputError extends BaseError {
  readonly code = HttpStatus.BAD_REQUEST;
  readonly message = 'Invalid user input';
  public readonly isPublic = true;

  /**
   * Creates a new instance of InvalidUserInputError.
   * @param errors - An array of error details associated with the invalid user input.
   */
  constructor(errors: IErrorDetail[] = []) {
    super();

    Object.setPrototypeOf(this, InvalidUserInputError.prototype);

    this.errors = errors;
  }

  static fromJoiValidationError(error: joi.ValidationError) {
    const errors: IErrorDetail[] = this.formatJoiValidationError(error);

    return new InvalidUserInputError(errors);
  }

  static formatJoiValidationError = (
    error: joi.ValidationError,
  ): IErrorDetail[] => {
    if (!error?.details?.length) {
      return [];
    }

    return error.details.map((currErr) => {
      const field =
        currErr.path.length > 0
          ? String(currErr.path[currErr.path.length - 1])
          : (currErr.message.split('"')[1] ?? 'field');
      const quotedField = `"${field}" `;
      const messageText = currErr.message.startsWith(quotedField)
        ? currErr.message.slice(quotedField.length)
        : currErr.message;
      return {
        field,
        message: capitalize(messageText),
      } satisfies IErrorDetail;
    });
  };

}
