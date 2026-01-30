import { BaseFetchProvider } from "@/modules/utils";
import { CheckBalancePayload, CheckBalanceResponse, ConfirmPaymentPayload, ConfirmPaymentResponse, ReloadBalancePayload, ReloadBalanceResponse, RequestPaymentPayload, RequestPaymentResponse } from "./interface";

export class DashboardProvider extends BaseFetchProvider {
    constructor() {
        super();
    }

    reloadBalance(payload: ReloadBalancePayload) {
        return this._post<ReloadBalanceResponse>('recargarBilletera', payload);
    }

    requestPayment(payload: RequestPaymentPayload) {
        return this._post<RequestPaymentResponse>('solicitarPago', payload);
    }

    confirmPayment(payload: ConfirmPaymentPayload) {
        return this._post<ConfirmPaymentResponse>('confirmarPago', payload);
    }

    checkBalance(payload: CheckBalancePayload) {
        return this._get<CheckBalanceResponse>('consultarSaldo', payload)
    }
}

export const dashboardProvider = new DashboardProvider();