export default async function (url: string): Promise<any> {
    const result = await $fetch<any>(url, {
        method: 'get',
        ignoreResponseError: true
    });

    return result.data.value
}