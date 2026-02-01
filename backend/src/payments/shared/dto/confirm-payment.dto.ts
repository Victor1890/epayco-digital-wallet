import Joi from 'joi';

export class ConfirmPaymentDto {
    sessionId: string;
    token: string;

    static validateSchema = Joi.object({
        sessionId: Joi.string().required(),
        token: Joi.string().length(6).required(),
    });
}
