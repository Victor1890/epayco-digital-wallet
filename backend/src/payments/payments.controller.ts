import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { RequestPaymentDto } from './shared/dto/request-payment.dto';
import { ConfirmPaymentDto } from './shared/dto/confirm-payment.dto';
import { ValidatedBody } from '@/shared/decorators/validate-request.decorator';

@Controller('/')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post('solicitarPago')
    @HttpCode(HttpStatus.OK)
    async requestPayment(@ValidatedBody(RequestPaymentDto.validateSchema) dto: RequestPaymentDto) {
        return this.paymentsService.requestPayment(dto);
    }

    @Post('confirmarPago')
    @HttpCode(HttpStatus.OK)
    async confirmPayment(@ValidatedBody(ConfirmPaymentDto.validateSchema) dto: ConfirmPaymentDto) {
        return this.paymentsService.confirmPayment(dto);
    }
}
