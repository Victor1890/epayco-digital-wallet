import { BaseFetchProvider } from "@/modules/utils";
import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "./interface";

export class AuthProvider extends BaseFetchProvider {
    constructor() {
        super();
    }

    login(_payload: LoginPayload) {
        return Promise.resolve<LoginResponse>({ success: true });
    }

    register(payload: RegisterPayload) {
        return this._post<RegisterResponse>('/registroCliente', payload);
    }
}

export const authProvider = new AuthProvider();