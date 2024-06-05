export default async function (url: string): Promise<any> {
    return await $fetch<any>(url, {
        method: 'get',
        ignoreResponseError: true
    });
}