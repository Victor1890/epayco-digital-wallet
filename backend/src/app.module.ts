import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/database/data-source';
import { apiEnvValidation } from '@/shared/validators/api-env-validation.schema';
import { ClientModule } from '@/client/client.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: apiEnvValidation,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ClientModule,
    TokenModule
  ],
})
export class AppModule { }
