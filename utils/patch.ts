import {useLocalStorage} from "@vueuse/core";

export default async function <T>(url: string, body: object): Promise<Resp<T>> {
    return await $fetch<Resp<T>>(url, {
        method: 'patch',
        body,
        ignoreResponseError: true,
        headers: {
            'Token': useLocalStorage('tisea-auth-token', '').value
        }
    });
}