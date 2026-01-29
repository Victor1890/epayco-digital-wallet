import { ClientService } from '@/client/client.service';
import { ReloadWalletDto } from '@/client/dto/reload-wallet.dto';
import { Controller, Post, Body, HttpCode, HttpStatus, Get, Query } from '@nestjs/common';

@Controller('recargarBilletera')
export class WalletController {
    constructor(private readonly clientService: ClientService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async recargarBilletera(@Body() reloadWalletDto: ReloadWalletDto) {
        const { documento, celular, valor } = reloadWalletDto;
        return this.clientService.recargarBilletera(documento, celular, valor);
    }
}
