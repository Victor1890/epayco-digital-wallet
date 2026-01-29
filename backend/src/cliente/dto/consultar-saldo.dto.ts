import { IsNotEmpty, IsString } from 'class-validator';

export class ConsultarSaldoDto {
    @IsNotEmpty()
    @IsString()
    documento: string;

    @IsNotEmpty()
    @IsString()
    celular: string;
}