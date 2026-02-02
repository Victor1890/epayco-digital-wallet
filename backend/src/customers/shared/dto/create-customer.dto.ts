import Joi from 'joi';

export class CreateCustomerDto {
    documento: string;
    nombres: string;
    email: string;
    celular: string;

    static validateSchema = Joi.object({
        documento: Joi.string().required(),
        nombres: Joi.string().required(),
        email: Joi.string().email().required(),
        celular: Joi.string().required(),
    })
}
