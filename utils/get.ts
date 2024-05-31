import {useLocalStorage} from "@vueuse/core";

export default async function <T>(url: string, withToken = true): Promise<T> {
    return await $fetch<T>(url, {
        method: 'get',
        ignoreResponseError: true,
        headers: withToken ? {
            'Token': useLocalStorage('tisea-auth-token', '').value
        } : {}
    });
}