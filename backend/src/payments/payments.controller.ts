import { ValidatedBody } from '@/shared/decorators/validate-request.decorator';
import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ConfirmPaymentDto } from './shared/dto/confirm-payment.dto';
import { RequestPaymentDto } from './shared/dto/request-payment.dto';

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
