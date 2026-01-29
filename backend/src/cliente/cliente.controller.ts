import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { RecargarBilleteraDto } from './dto/recargar-billetera.dto';

@Controller('registroCliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClienteDto: CreateClienteDto) {
        return this.clienteService.createCliente(createClienteDto);
    }

    @Post('recargarBilletera')
    @HttpCode(HttpStatus.OK)
    async recargarBilletera(@Body() recargarBilleteraDto: RecargarBilleteraDto) {
        const { documento, celular, valor } = recargarBilleteraDto;
        return this.clienteService.recargarBilletera(documento, celular, valor);
    }
}