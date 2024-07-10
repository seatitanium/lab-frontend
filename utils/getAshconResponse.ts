import getAny from "~/utils/getAny";

interface AshconResponse {
    created_at: null,
    textures: {
        custom: boolean,
        raw: {
            signature: string,
            value: string
        },
        skin: {
            data: string,
            url: string
        },
        slim: boolean
    },
    username: string,
    username_history: {username: string}[],
    uuid: string
}

export default async function(playername: string) {
    return await getAny(`https://api.ashcon.app/mojang/v2/user/${playername}`) as Promise<AshconResponse>
}