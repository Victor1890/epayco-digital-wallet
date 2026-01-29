import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClienteDto } from './dto/create-client.dto';
import { ReloadWalletDto } from './dto/reload-wallet.dto';
import { RequestPaymentDto } from './dto/request-payment.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { CheckBalanceDto } from './dto/check-balance.dto';

@Controller('/')
export class ClientController {
    constructor(private readonly clientService: ClientService) { }

    @Post('registroCliente')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClienteDto: CreateClienteDto) {
        return this.clientService.createCliente(createClienteDto);
    }

    @Post('recargarBilletera')
    @HttpCode(HttpStatus.OK)
    async recargarBilletera(@Body() reloadWalletDto: ReloadWalletDto) {
        const { documento, celular, valor } = reloadWalletDto;
        return this.clientService.recargarBilletera(documento, celular, valor);
    }

    @Post('solicitarPago')
    @HttpCode(HttpStatus.OK)
    async solicitarPago(@Body() { celular, documento, valor }: RequestPaymentDto) {
        return this.clientService.solicitarPago(documento, celular, valor);
    }

    @Post('confirmarPago')
    @HttpCode(HttpStatus.OK)
    async confirmarPago(@Body() confirmPaymentDto: ConfirmPaymentDto) {
        const { sessionId, token } = confirmPaymentDto;
        return this.clientService.confirmarPago(sessionId, token);
    }

    @Get('consultarSaldo')
    @HttpCode(HttpStatus.OK)
    async consultarSaldo(@Query() checkBalanceDto: CheckBalanceDto) {
        const { documento, celular } = checkBalanceDto;
        return this.clientService.consultarSaldo(documento, celular);
    }
}
