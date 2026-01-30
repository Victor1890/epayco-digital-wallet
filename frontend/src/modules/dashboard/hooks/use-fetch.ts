import { useMutation } from "@tanstack/react-query";
import { dashboardProvider } from "../api";
import { CheckBalancePayload, ConfirmPaymentPayload, ReloadBalancePayload, RequestPaymentPayload } from "../api/interface";

export function useReloadBalance() {
    return useMutation({
        mutationKey: ['reload-balance'],
        mutationFn: (payload: ReloadBalancePayload) => {
            return dashboardProvider.reloadBalance(payload);
        },
    })
}

export function useRequestPayment() {
    return useMutation({
        mutationKey: ['request-payment'],
        mutationFn: (payload: RequestPaymentPayload) => {
            return dashboardProvider.requestPayment(payload);
        },
    })
}

export function useConfirmPayment() {
    return useMutation({
        mutationKey: ['confirm-payment'],
        mutationFn: (payload: ConfirmPaymentPayload) => {
            return dashboardProvider.confirmPayment(payload);
        },
    })
}

export function useCheckBalance() {
    return useMutation({
        mutationKey: ['check-balance'],
        mutationFn: (payload: CheckBalancePayload) => {
            return dashboardProvider.checkBalance(payload);
        },
    })
}