import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { RecargarBilleteraDto } from './dto/recargar-billetera.dto';
import { SolicitarPagoDto } from './dto/solicitar-pago.dto';
import { ConfirmarPagoDto } from './dto/confirmar-pago.dto';

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

    @Post('solicitarPago')
    @HttpCode(HttpStatus.OK)
    async solicitarPago(@Body() solicitarPagoDto: SolicitarPagoDto) {
        const { documento, celular, valor } = solicitarPagoDto;
        return this.clienteService.solicitarPago(documento, celular, valor);
    }

    @Post('confirmarPago')
    @HttpCode(HttpStatus.OK)
    async confirmarPago(@Body() confirmarPagoDto: ConfirmarPagoDto) {
        const { sessionId, token } = confirmarPagoDto;
        return this.clienteService.confirmarPago(sessionId, token);
    }
}