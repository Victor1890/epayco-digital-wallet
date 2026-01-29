import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './models/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { randomInt } from 'crypto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
    ) { }

    async createCliente(createClienteDto: CreateClienteDto) {
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

    async solicitarPago(documento: string, celular: string, valor: number) {
        const cliente = await this.clienteRepository.findOne({ where: { documento, celular } });

        console.log('Cliente found:', cliente);

        if (!cliente) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        if (cliente.saldo < valor) {
            throw new BadRequestException('Insufficient balance.');
        }

        const otp = randomInt(100000, 999999).toString();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiration

        cliente.otp = otp;
        cliente.otpExpiration = otpExpiration;
        await this.clienteRepository.save(cliente);

        // Simulate sending OTP via email (replace with actual email service)
        console.log(`Sending OTP ${otp} to ${cliente.email}`);

        const sessionId = uuidv4();

        return {
            message: 'OTP sent to registered email.',
            sessionId,
        };
    }
}