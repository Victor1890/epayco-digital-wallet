import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@/database/data-source';
import { apiEnvValidation } from '@/shared/validators/api-env-validation.schema';
import { appModules } from '@/shared/config/modules';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: apiEnvValidation,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    ...appModules,
    UserModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule { }
