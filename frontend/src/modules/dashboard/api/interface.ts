export interface ReloadBalancePayload {
    documento: string;
    celular: string;
    valor: number;
}

export interface ReloadBalanceResponse {
    saldo: number;
}