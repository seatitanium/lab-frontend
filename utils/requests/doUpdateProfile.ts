import patch from "~/utils/patch";
import {BackendCodes} from "~/consts";

export default async function doUpdateProfile(username: string, object: {
    [prop: string]: any
}, onSuccess: () => void, onException: (r: Resp<unknown>) => void) {

    const result = await patch(`/api/user/profile?username=${username}`, object);

    if (result.code === BackendCodes.OK) {
        onSuccess();
    } else {
        onException(result);
    }
}