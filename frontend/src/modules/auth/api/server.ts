import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { Client } from "../session";

export const loginServerAction = createServerFn({ method: "POST" })
    .inputValidator(data => data as Client)
    .handler(
        async ({ data }) => {
            const client = JSON.stringify(data as any);

            setCookie(import.meta.env.EPAYCO_COOKIE_NAME, client, {
                httpOnly: true,
                secure: import.meta.env.PROD,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7,
            });
            return { success: true };
        }
    );
