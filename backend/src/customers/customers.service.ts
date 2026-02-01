import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './shared/dto/create-customer.dto';
import { CustomerEntity } from './model/customer.entity';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomerEntity)
        private readonly customerRepo: Repository<CustomerEntity>,
    ) { }

    async registerCustomer(payload: CreateCustomerDto): Promise<CustomerEntity> {
        const exists = await this.customerRepo.findOne({
            where: [
                { documento: payload.documento },
                { celular: payload.celular },
            ],
        });
        if (exists) {
            throw new BadRequestException('Cliente ya registrado con documento, email o celular.');
        }
        const customer = this.customerRepo.create(payload);
        return this.customerRepo.save(customer);
    }

    findByDocumentoAndCelular(documento: string, celular: string): Promise<CustomerEntity | null> {
        return this.customerRepo.findOne({
            where: { documento, celular },
        });
    }
}
