import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './shared/dto/create-customer.dto';
import { ValidatedBody } from '@/shared/decorators/validate-request.decorator';

@Controller('/')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Post('registroCliente')
    @HttpCode(HttpStatus.CREATED)
    async register(
        @ValidatedBody(CreateCustomerDto.validateSchema) dto: CreateCustomerDto,
    ) {
        const customer = await this.customersService.registerCustomer(dto);
        return customer.toJSON()
    }
}
