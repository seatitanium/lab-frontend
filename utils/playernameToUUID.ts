import getAshconResponse from "~/utils/getAshconResponse";

export default async function (playername: string) {
    return (await getAshconResponse(playername)).uuid;
}