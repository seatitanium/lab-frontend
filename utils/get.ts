import {useLocalStorage} from "@vueuse/core";

export default async function <T>(url: string): Promise<T> {
    return await $fetch<T>(url, {
        method: 'get',
        ignoreResponseError: true,
        headers: {
            'Token': useLocalStorage('tisea-auth-token', '').value
        }
    });
}