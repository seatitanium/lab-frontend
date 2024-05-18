import {useLocalStorage} from "@vueuse/core";

export default async function <T>(url: string, body: object): Promise<T> {
    return await $fetch<T>(url, {
        method: 'post',
        body,
        ignoreResponseError: true,
        headers: {
            'Token': useLocalStorage('tisea-auth-token', '').value
        }
    });
}