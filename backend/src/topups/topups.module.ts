import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopupEntity } from './model/topup.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopupEntity])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class TopupsModule { }
