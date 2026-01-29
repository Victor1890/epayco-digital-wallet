import { IsNotEmpty, IsString } from 'class-validator';

export class CheckBalanceDto {
    @IsNotEmpty()
    @IsString()
    documento: string;

    @IsNotEmpty()
    @IsString()
    celular: string;
}