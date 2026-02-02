import { PipeTransform } from '@nestjs/common';
import { ObjectSchema, ValidationOptions } from 'joi';
import { InvalidUserInputError } from '../errors/invalid-user-input.error';

export class ValidationPipe implements PipeTransform {
  constructor(
    private validationSchema: ObjectSchema,
    private options: ValidationOptions = {
      abortEarly: false,
      convert: true,
      stripUnknown: true,
    },
  ) { }

  public transform(value: Record<string, unknown>) {
    const result = this.validationSchema.options(this.options).validate(value);

    if (result.error) {
      throw InvalidUserInputError.fromJoiValidationError(result.error);
    }

    return result.value;
  }
}
