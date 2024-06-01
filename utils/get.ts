import {useLocalStorage} from "@vueuse/core";

export default async function <T>(url: string, withToken = true): Promise<Resp<T>> {
    return await $fetch<Resp<T>>(url, {
        method: 'get',
        ignoreResponseError: true,
        headers: withToken ? {
            'Token': useLocalStorage('tisea-auth-token', '').value
        } : {}
    });
}