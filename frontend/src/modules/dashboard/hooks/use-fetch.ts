import { useMutation } from "@tanstack/react-query";
import { dashboardProvider } from "../api";
import { ReloadBalancePayload } from "../api/interface";

export function useReloadBalance() {
    return useMutation({
        mutationKey: ['reload-balance'],
        mutationFn: async (payload: ReloadBalancePayload) => {
            return dashboardProvider.reloadBalance(payload);
        },
    })
}