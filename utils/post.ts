export default async function <T>(url: string, body: object): Promise<T> {
    return await $fetch<T>(url, {
        method: 'post',
        body,
        ignoreResponseError: true
    });
}