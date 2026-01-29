import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './models/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) { }

    async createCliente(createClienteDto: CreateClienteDto): Promise<Cliente> {
        const { documento, email } = createClienteDto;

        const existingCliente = await this.clienteRepository.findOne({
            where: [{ documento }, { email }],
        });

        if (existingCliente) {
            throw new BadRequestException('Cliente with the same documento or email already exists.');
        }

        const cliente = this.clienteRepository.create(createClienteDto);
        return this.clienteRepository.save(cliente);
    }
}