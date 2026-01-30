import { Service } from '@/shared/classes/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateClienteDto } from './dto/create-client.dto';
import { Client } from './models/client.entity';

@Injectable()
export class ClientService extends Service<Client> {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
    ) {
        super(Client.name, clientRepository);
    }

    async createCliente(createClienteDto: CreateClienteDto) {
        const { documento, email } = createClienteDto;

        const existingCliente = await this.clientRepository.findOne({
            where: [{ documento }, { email }],
        });

        if (existingCliente) {
            throw new BadRequestException('Cliente with the same documento or email already exists.');
        }

        const cliente = this.clientRepository.create(createClienteDto);
        return this.clientRepository.save(cliente);
    }

    async recargarBilletera(documento: string, celular: string, valor: number) {
        const cliente = await this.clientRepository.findOne({ where: { documento, celular } });

        if (!cliente) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        cliente.saldo += valor;
        await this.clientRepository.save(cliente);

        return { saldo: cliente.saldo };
    }

    async solicitarPago(documento: string, celular: string, valor: number) {
        const cliente = await this.clientRepository.findOne({ where: { documento, celular } });

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
        await this.clientRepository.save(cliente);

        // Simulate sending OTP via email (replace with actual email service)
        console.log(`Sending OTP ${otp} to ${cliente.email}`);

        const sessionId = uuidv4();

        return {
            message: 'OTP sent to registered email.',
            sessionId,
            token: otp, // In real scenario, do not return the token
        };
    }

    async confirmarPago(sessionId: string, token: string): Promise<string> {
        const cliente = await this.clientRepository.findOne({ where: { otp: token } });

        const valor = 0; // Placeholder since 'valor' is not passed in parameters

        if (!cliente) {
            throw new BadRequestException('Invalid token or session ID.');
        }

        if (!cliente.otpExpiration || cliente.otpExpiration < new Date()) {
            throw new BadRequestException('Token has expired.');
        }

        if (cliente.saldo < valor) {
            throw new BadRequestException('Insufficient balance.');
        }

        cliente.saldo -= valor;
        cliente.otp = null;
        cliente.otpExpiration = null;
        await this.clientRepository.save(cliente);

        return 'Payment confirmed successfully.';
    }

    async consultarSaldo(documento: string, celular: string): Promise<{ saldo: number }> {
        const cliente = await this.clientRepository.findOne({ where: { documento, celular } });

        if (!cliente) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        return { saldo: cliente.saldo };
    }
}