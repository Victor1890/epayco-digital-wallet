import { TokenModule } from '@/token/token.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './models/client.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Client]),
        TokenModule,
    ],
    controllers: [ClientController],
    providers: [ClientService],
})
export class ClientModule { }