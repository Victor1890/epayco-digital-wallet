import { Service } from '@/shared/classes/base.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from '../token/token.service';
import { CreateClienteDto } from './dto/create-client.dto';
import { Client } from './models/client.entity';
import { EnumTokenType } from '@/token/shared/enums/types.interface';

@Injectable()
export class ClientService extends Service<Client> {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly tokenService: TokenService,
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
        const client = await this.clientRepository.findOne({ where: { documento, celular } });

        if (!client) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        if (client.saldo < valor) {
            throw new BadRequestException('Insufficient balance.');
        }

        const token = await this.tokenService.create(client, 'PAYMENT_CONFIRMATION', { valor });

        return {
            sessionId: client.uuid,
            token
        };
    }

    async confirmarPago(sessionId: string, token: string) {

        const client = await this.clientRepository.findOne({ where: { uuid: sessionId } });

        if (!client) {
            throw new BadRequestException('Invalid session ID.');
        }

        const tokenEntity = await this.tokenService.findOne({ where: { clientId: client.id, type: EnumTokenType.PAYMENT_CONFIRMATION } });
        this.tokenService.validateToken(tokenEntity, EnumTokenType.PAYMENT_CONFIRMATION);

        const isTokenValid = this.tokenService.verifyToken(token, tokenEntity!.token);

        if (!isTokenValid) {
            throw new BadRequestException('Invalid token.');
        }
        const session = tokenEntity!.payload as { valor: number };

        if (client.saldo < session.valor) {
            throw new BadRequestException('Insufficient balance.');
        }

        client.saldo -= session.valor;
        await this.clientRepository.save(client);
        await this.tokenService.updateTokenAsUsed(tokenEntity!.id);

        return { isValid: true };
    }

    async consultarSaldo(documento: string, celular: string): Promise<{ saldo: number }> {
        const cliente = await this.clientRepository.findOne({ where: { documento, celular } });

        if (!cliente) {
            throw new BadRequestException('Cliente not found or data mismatch.');
        }

        return { saldo: cliente.saldo };
    }
}