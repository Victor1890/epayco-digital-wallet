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

    async recargarBilletera(documento: string, celular: string, valor: number) {
        const cliente = await this.clienteRepository.findOne({ where: { documento, celular } });

        if (!cliente) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        cliente.saldo += valor;
        await this.clienteRepository.save(cliente);

        return { saldo: cliente.saldo };
    }
}