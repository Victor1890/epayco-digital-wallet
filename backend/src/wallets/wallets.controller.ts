import { Controller, Post, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { ConsultBalanceDto } from './shared/dto/consult-balance.dto';
import { CustomersService } from '@/customers/customers.service';
import { ValidatedBody } from '@/shared/decorators/validate-request.decorator';

@Controller('consultarSaldo')
export class WalletsController {
    constructor(
        private readonly walletsService: WalletsService,
        private readonly customersService: CustomersService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async consultBalance(@ValidatedBody(ConsultBalanceDto.validateSchema) dto: ConsultBalanceDto) {
        const customer = await this.customersService.findByDocumentoAndCelular(dto.documento, dto.celular);
        if (!customer) throw new NotFoundException('Cliente no encontrado');

        const balance = await this.walletsService.getBalanceByCustomerId(customer.id);

        return { saldo: balance ?? 0 };
    }
}
