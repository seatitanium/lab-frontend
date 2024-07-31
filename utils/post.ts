import {useLocalStorage} from "@vueuse/core";
import {APIEndpoint} from "~/consts";

export default async function post<T>(url: string, body: object): Promise<Resp<T>> {
    return await $fetch<Resp<T>>(APIEndpoint + url, {
        method: 'post',
        body,
        ignoreResponseError: true,
        headers: {
            'Token': useLocalStorage('tisea-auth-token', '').value
        }
    });
}