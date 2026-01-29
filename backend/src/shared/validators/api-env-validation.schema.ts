import { NodeEnvs } from '@/shared/config/node-env.enum';
import Joi from 'joi';

/**
 * Validation schema for API environment variables.
 */
export const apiEnvValidation = Joi.object({

    // Application
    NODE_ENV: Joi.string()
        .valid(...Object.values(NodeEnvs))
        .default(NodeEnvs.DEVELOPMENT),
    PORT: Joi.number().port().default(4000),

    // MySQL Database
    MYSQL_MIGRATIONS_TABLE: Joi.string().required(),
    MYSQL_DB_URI: Joi.string().required(),

});
