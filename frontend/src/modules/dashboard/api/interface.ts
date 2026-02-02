interface PayloadBase {
    documento: string;
    celular: string;
}

export interface ReloadBalancePayload extends PayloadBase {
    valor: number;
}

export interface ReloadBalanceResponse {
    balance: number;
}

export interface RequestPaymentPayload extends PayloadBase {
    valor: number;
}

export interface RequestPaymentResponse {
    sessionId: string;
    otp: string;
}

export interface ConfirmPaymentPayload {
    sessionId: string;
    token: string;
}

export interface ConfirmPaymentResponse {
    isValid: boolean;
}

export interface CheckBalancePayload extends PayloadBase { }

export interface CheckBalanceResponse {
    saldo: number;
}