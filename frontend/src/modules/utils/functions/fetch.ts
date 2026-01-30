import axios, {
    AxiosError,
    AxiosHeaders,
    AxiosInstance,
    AxiosRequestConfig,
    HeadersDefaults,
    RawAxiosRequestHeaders,
} from 'axios'

export function getAPIBaseURL(): string {
    const backendURL = import.meta.env.EPAYCO_BACKEND_URL
    return String(backendURL)
}

export class BaseFetchProvider {
    private readonly axios: AxiosInstance

    constructor(
        api = getAPIBaseURL(),
        config?: AxiosRequestConfig,
        headers?: RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>,
    ) {
        this.axios = axios.create({
            baseURL: api,
            withCredentials: false,
            ...(config || {}),
            headers,
        })
    }

    private _params(params: Record<string, any>): string {
        return Object.keys(params)
            .map((key) => {
                let value = params[key]
                value = typeof value == typeof {} ? JSON.stringify(value) : value
                return `${key}=${value}`
            })
            .join('&')
    }

    private _extractErrorMessage(error: AxiosError<any>): string {
        const response = error.response

        const conditionError = response && response.data && response.data.error
        const conditionWithMessage =
            response && response.data && response.data.message

        if (conditionWithMessage) return response.data.message
        if (conditionError) return response.data.error.message

        return `${error.message}`
    }

    protected async _get<
        TResponse = unknown,
        TQuery extends object = {},
        TConfig extends AxiosRequestConfig = {},
    >(
        url: string,
        params: TQuery = {} as TQuery,
        config: TConfig = {} as TConfig,
    ): Promise<TResponse> {
        const _isParam = Object.keys(params).length > 0

        return new Promise((resolve, reject) => {
            this.axios
                .get<TResponse>(`${url}${_isParam ? `?${this._params(params)}` : ''}`, {
                    ...config,
                    headers: {
                        ...config.headers,
                    },
                })
                .then((res) => {
                    return resolve(res.data)
                })
                .catch((error: AxiosError<any>) => {
                    const message = this._extractErrorMessage(error)
                    const { status } = error?.response || {}
                    return reject({ message, status })
                })
        })
    }

    protected _post<
        TResponse = unknown,
        TPayload extends object = {},
        TQuery extends object = {},
        TConfig extends AxiosRequestConfig = {},
    >(
        url: string,
        data: TPayload = {} as TPayload,
        params: TQuery = {} as TQuery,
        config: TConfig = {} as TConfig,
    ): Promise<TResponse> {
        const _isParam = Object.keys(params).length > 0

        return new Promise((resolve, reject) => {
            this.axios
                .post<TResponse>(
                    `${url}${_isParam ? `?${this._params(params)}` : ''}`,
                    data,
                    {
                        ...config,
                        headers: {
                            ...config.headers,
                        },
                    },
                )
                .then((res) => resolve(res.data))
                .catch((error: AxiosError<any>) => {
                    const message = this._extractErrorMessage(error)
                    const { data, status } = error?.response || {}
                    const _data = data?.error || data || {}
                    return reject({ message, ..._data, status })
                })
        })
    }

    protected _patch<
        TResponse = unknown,
        TPayload extends object = {},
        TQuery extends object = {},
        TConfig extends AxiosRequestConfig = {},
    >(
        url: string,
        data: TPayload = {} as TPayload,
        params: TQuery = {} as TQuery,
        config: TConfig = {} as TConfig,
    ): Promise<TResponse> {
        return new Promise((resolve, reject) => {
            const _isParam = Object.keys(params).length > 0

            this.axios
                .patch<TResponse>(
                    `${url}${_isParam ? `?${this._params(params)}` : ''}`,
                    data,
                    {
                        ...config,
                        headers: {
                            ...config.headers,
                        },
                    },
                )
                .then((res) => resolve(res.data))
                .catch((error: AxiosError<any>) => {
                    const message = this._extractErrorMessage(error)
                    const { status } = error?.response || {}
                    return reject({ message, status })
                })
        })
    }

    protected _delete<
        TResponse = unknown,
        TQuery extends object = {},
        TConfig extends AxiosRequestConfig = {},
    >(
        url: string,
        params: TQuery = {} as TQuery,
        config: TConfig = {} as TConfig,
    ): Promise<TResponse> {
        return new Promise((resolve, reject) => {
            const _isParam = Object.keys(params).length > 0

            this.axios
                .delete<TResponse>(
                    `${url}${_isParam ? `?${this._params(params)}` : ''}`,
                    {
                        ...config,
                        headers: {
                            ...config.headers,
                        },
                    },
                )
                .then((res) => resolve(res.data))
                .catch((error: AxiosError<any>) => {
                    const message = this._extractErrorMessage(error)
                    const { status } = error?.response || {}
                    return reject({ message, status })
                })
        })
    }
}
