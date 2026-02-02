import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './model/customer.entity';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { WalletsModule } from '@/wallets/wallets.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([CustomerEntity]),
        forwardRef(() => WalletsModule)
    ],
    controllers: [CustomersController],
    providers: [CustomersService],
    exports: [TypeOrmModule, CustomersService],
})
export class CustomersModule { }
