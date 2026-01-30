import { IBaseEntity } from "@/shared/interfaces/base-entity.interface";

export interface IClient extends IBaseEntity {
    documento: string;
    nombres: string;
    email: string;
    celular: string;
    saldo: number;
}
