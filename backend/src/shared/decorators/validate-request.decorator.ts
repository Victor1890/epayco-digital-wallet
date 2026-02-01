import { Body, Query } from '@nestjs/common';
import { ObjectSchema, ValidationOptions } from 'joi';
import { ValidationPipe } from '../pipes/validation.pipe';

/**
 * Decorator that validates the request body using a given schema.
 * @param schema The schema to validate the request body against.
 * @returns A decorator function that applies the validation to the request body.
 */
export function ValidatedBody(
  schema: ObjectSchema<any>,
  options?: ValidationOptions,
) {
  return Body(new ValidationPipe(schema, options));
}

/**
 * Decorator function that validates the query parameters of a request using a Joi schema.
 *
 * @param schema - The Joi schema used for validation.
 * @returns A decorator function that applies the validation to the query parameters.
 */
export function ValidatedQueryParams(schema: ObjectSchema) {
  return Query(new ValidationPipe(schema));
}
