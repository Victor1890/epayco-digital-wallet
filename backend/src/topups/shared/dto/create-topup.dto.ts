import Joi from 'joi';

export class CreateTopupDto {
    documento: string;
    celular: string;
    valor: number;

    static validateSchema = Joi.object({
        documento: Joi.string().required(),
        celular: Joi.string().required(),
        valor: Joi.number().positive().required(),
    });
}
