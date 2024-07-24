import {useLocalStorage} from "@vueuse/core";
import {LocalStorageAuthUsernameKey} from "~/consts";

export default function () {
    return useLocalStorage(LocalStorageAuthUsernameKey, '');
}