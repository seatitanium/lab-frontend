import {useLocalStorage} from "@vueuse/core";

export default function getToken() {
    return useLocalStorage('tisea-auth-token', '');
}