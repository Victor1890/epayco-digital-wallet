import { useMutation } from "@tanstack/react-query"
import { LoginPayload, RegisterPayload } from "../api/interface";
import { authProvider } from "../api";
import { useAuthStore } from "../store/auth.store";

export function useLoginAuth() {
    const data = useMutation({
        mutationKey: ['login-auth'],
        mutationFn: async (_payload: LoginPayload) => {
            const client = useAuthStore.getState().data.client;

            if (client?.documento === _payload.documento && client?.celular === _payload.celular) {
                return Promise.resolve({ success: true });
            }

            return Promise.reject({ messsage: 'Credenciales invalidas' });
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
        onSuccess(data) {
            useAuthStore.getState().setData({ client: data });
        },
    })

    return {
        ...data,
        data: data.data,
    }
}