import { useMutation } from "@tanstack/react-query"
import { LoginPayload, RegisterPayload } from "../api/interface";
import { authProvider } from "../api";
import { useAuthStore } from "../store/auth.store";
import { loginServerAction } from "../api/server";

export function useLoginAuth() {
    const data = useMutation({
        mutationKey: ['login-auth'],
        mutationFn: async (payload: LoginPayload) => {
            const client = useAuthStore.getState().data.client;

            console.log("client: ", {
                clientDoc: client?.documento,
                clientCel: client?.celular,
                payloadDoc: payload.documento,
                payloadCel: payload.celular
            }, payload)

            if (client?.documento == payload.documento && client?.celular == payload.celular) {
                return loginServerAction({ data: client })
            }

            return Promise.reject(new Error('Credenciales inválidas'));
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
        mutationFn: (payload: RegisterPayload) => {
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