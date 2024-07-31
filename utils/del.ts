import {useLocalStorage} from "@vueuse/core";
import {APIEndpoint} from "~/consts";

export default async function <T>(url: string, withToken = true): Promise<Resp<T>> {
    return await $fetch<Resp<T>>(APIEndpoint + url, {
        method: 'delete',
        ignoreResponseError: true,
        headers: withToken ? {
            'Token': useLocalStorage('tisea-auth-token', '').value
        } : {}
    });
}