import axios, { AxiosRequestConfig } from "axios";

interface ObjectType {
    [key: string]: any;
}

type Destination = "onboarding" | "core" | "bff";

const urls = {
    onboarding: process.env.REACT_APP_ONBOARDING_URL,
    core: process.env.REACT_APP_CORE_URL,
    bff: process.env.REACT_APP_BFF_URL,
};

export async function apiPost(
    destination: Destination,
    path: string,
    data: ObjectType,
    headers: ObjectType
) {
    const config = {
        method: "POST",
        url: `${urls[destination]}${path}`,
        data: data,
        withCredentials: true,
        headers,
    };

    const request = await axios(config)
        .then((response) => {
            return { status: response.status, data: response.data };
        })
        .catch((e) => {
            try {
                return { status: e.response.status, data: e.response.data };
            } catch {
                return { status: 500, data: "Something went wrong : 500" };
            }
        });

    return request;
}

export async function apiGet(
    destination: Destination,
    path: string,
    headers: ObjectType,
    data?: ObjectType,
    username?: string,
    password?: string
) {
    const config: AxiosRequestConfig<any> = {
        method: "GET",
        url: `${urls[destination]}${path}`,
        headers,
        params: data,
    };
    if (username && password) {
        config.auth = { username, password };
    }
    const request = await axios(config)
        .then((response) => {
            return { status: response.status, data: response.data };
        })
        .catch((e) => {
            try {
                return { status: e.response.status, data: e.response.data };
            } catch {
                return { status: 500, data: "Something went wrong : 500" };
            }
        });
    return request;
}

export async function apiPut(
    destination: Destination,
    path: string,
    data: ObjectType
) {
    let request = null;
    try {
        const headers = {
            "Content-Type": "application/json",
        };
        const config: AxiosRequestConfig<any> = {
            headers,
        };

        request = await axios
            .put(`${urls[destination]}${path}`, data, config)
            .then((response) => {
                return response.data;
            })
            .catch((e) => {
                try {
                    return e.response.data;
                } catch {
                    return {
                        status: false,
                        data: "Something went wrong : 500",
                    };
                }
            });
        return request;
    } catch (e) {
        return { status: false, data: e };
    }
}

export async function apiDelete(destination: Destination, path: string) {
    let request = null;
    try {
        request = await axios
            .delete(`${urls[destination]}${path}`)
            .then((response) => {
                return response.data;
            })
            .catch((e) => {
                try {
                    return e.response.data;
                } catch {
                    return {
                        status: false,
                        data: "Something went wrong : 500",
                    };
                }
            });
        return request;
    } catch (e) {
        return { status: false, data: e };
    }
}
