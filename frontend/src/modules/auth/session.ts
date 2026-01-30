import { useSession } from '@tanstack/react-start/server'

export interface Client {
    uuid: string,
    documento: string,
    nombres: string,
    email: string,
    celular: string,
    saldo: number,
    createdAt: string
}

export type SessionData = {
    isLogged: boolean
    user: Client | null
}

export function useAppSession() {
    return useSession<SessionData>({
        name: import.meta.env.EPAYCO_SESSION_COOKIE_NAME,
        password: import.meta.env.EPAYCO_SESSION_SECRET,
        cookie: {
            secure: import.meta.env.PROD,
            httpOnly: true,
            sameSite: 'lax',
        }
    })
}