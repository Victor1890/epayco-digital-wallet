import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class SolicitarPagoDto {
    @IsNotEmpty()
    @IsString()
    documento: string;

    @IsNotEmpty()
    @IsString()
    celular: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    valor: number;
}