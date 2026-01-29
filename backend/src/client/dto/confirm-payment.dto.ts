import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ConfirmPaymentDto {
    @IsNotEmpty()
    @IsString()
    sessionId: string;

    @IsNotEmpty()
    @IsString()
    @Length(6, 6)
    token: string;
}