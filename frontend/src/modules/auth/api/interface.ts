import { Client } from "../session"

export interface LoginPayload {
    documento: string,
    celular: string,
}

export interface LoginResponse {
    success: boolean
}

export interface RegisterPayload {
    documento: string
    nombres: string
    email: string
    celular: string
}

export interface RegisterResponse extends Client { }
