export default async function getURLFileSize(url: string)  {
    const result = await $fetch(url, {
        method: 'HEAD',
        headers: {
            'X-HTTP-Method-Override': 'HEAD',
        },
    });

    console.log(result)
}