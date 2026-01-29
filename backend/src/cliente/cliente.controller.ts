import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('registroCliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createClienteDto: CreateClienteDto) {
        return this.clienteService.createCliente(createClienteDto);
    }
}