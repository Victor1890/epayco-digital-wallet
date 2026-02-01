import Joi from 'joi';

export class ConsultBalanceDto {
    documento: string;
    celular: string;

    static validateSchema = Joi.object({
        documento: Joi.string().required(),
        celular: Joi.string().required(),
    });
}
