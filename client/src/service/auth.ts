import { request } from "./starter"

const postJson = async (url: string, data: unknown) => {
    return request(`/auth${url}`, 'POST', data);
}
const getJson = async (url: string) => {
    return request(`/auth${url}`, 'GET', undefined);
}

export function GetMe() {
    return getJson('/me')
}
