import {useLocalStorage} from "@vueuse/core";
import {APIEndpoint} from "~/consts";

export default async function patch<T>(url: string, body: object): Promise<Resp<T>> {
    return await $fetch<Resp<T>>(APIEndpoint + url, {
        method: 'patch',
        body,
        ignoreResponseError: true,
        headers: {
            'Authorization': useLocalStorage('tisea-auth-token', '').value
        }
    });
}