import { Controller, Post, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RequestPaymentDto } from './shared/dto/request-payment.dto';
import { ConfirmPaymentDto } from './shared/dto/confirm-payment.dto';
import { ValidatedBody, ValidatedQueryParams } from '@/shared/decorators/validate-request.decorator';

@Controller('/')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('solicitarPago')
    @HttpCode(HttpStatus.OK)
    async requestPayment(@ValidatedBody(RequestPaymentDto.validateSchema) dto: RequestPaymentDto) {
        return this.paymentsService.requestPayment(dto);
    }

    @Get('confirmarPago')
    @HttpCode(HttpStatus.OK)
    async confirmPayment(@ValidatedQueryParams(ConfirmPaymentDto.validateSchema) dto: ConfirmPaymentDto) {
        return this.paymentsService.confirmPayment(dto);
    }
}
