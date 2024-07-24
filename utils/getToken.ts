import {useLocalStorage} from "@vueuse/core";
import {LocalStorageAuthTokenKey} from "~/consts";

export default function getToken() {
    return useLocalStorage(LocalStorageAuthTokenKey, '');
}