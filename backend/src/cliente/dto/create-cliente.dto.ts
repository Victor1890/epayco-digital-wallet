import { IsNotEmpty, IsString, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateClienteDto {
    @IsNotEmpty()
    @IsString()
    documento: string;

    @IsNotEmpty()
    @IsString()
    nombres: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsMobilePhone()
    celular: string;
}