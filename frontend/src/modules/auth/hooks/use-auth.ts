import { useMutation } from "@tanstack/react-query"
import { LoginPayload, RegisterPayload } from "../api/interface";
import { authProvider } from "../api";

export function useLoginAuth() {
    const data = useMutation({
        mutationKey: ['login-auth'],
        mutationFn: async (_payload: LoginPayload) => {
            return Promise.resolve({ success: true });
        },
    })

    return {
        ...data,
        data: data.data,
    }

}

export function useRegisterAuth() {
    const data = useMutation({
        mutationKey: ['register-auth'],
        mutationFn: async (payload: RegisterPayload) => {
            return authProvider.register(payload)
        },
    })

    return {
        ...data,
        data: data.data,
    }
}