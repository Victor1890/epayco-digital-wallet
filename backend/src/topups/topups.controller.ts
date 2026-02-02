import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { TopupsService } from './topups.service';
import { CreateTopupDto } from './shared/dto/create-topup.dto';
import { ValidatedBody } from '@/shared/decorators/validate-request.decorator';

@Controller('recargarBilletera')
export class TopupsController {
    constructor(private readonly topupsService: TopupsService) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    async topup(@ValidatedBody(CreateTopupDto.validateSchema) dto: CreateTopupDto) {
        return this.topupsService.topupWallet(dto);
    }
}
