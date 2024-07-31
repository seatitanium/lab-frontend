import post from "~/utils/post";
import {BackendCodes} from "~/consts";
import {useLocalStorage} from "@vueuse/core";

export default async function doLogin(payload: {username: string, password: string}, onSuccess: () => void, onException: (r: Resp<LoginRes>) => void) {
    const result = await post<LoginRes>('/auth/login', {
        username: payload.username,
        password: payload.password
    });

    if (result.code === BackendCodes.OK) {
        const token = useLocalStorage('tisea-auth-token', '');
        const username = useLocalStorage('tisea-auth-username', '');
        token.value = result.data.token;
        username.value = result.data.username;
        onSuccess();
    } else {
        onException(result);
    }
}