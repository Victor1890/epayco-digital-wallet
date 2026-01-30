import { BaseFetchProvider } from "@/modules/utils";
import { ReloadBalancePayload, ReloadBalanceResponse } from "./interface";

export class DashboardProvider extends BaseFetchProvider {
    constructor() {
        super();
    }

    reloadBalance(payload: ReloadBalancePayload) {
        return this._post<ReloadBalanceResponse>('recargarBilletera', payload);
    }
}

export const dashboardProvider = new DashboardProvider();