import {useLocalStorage} from "@vueuse/core";

export default function () {
    return useLocalStorage('tisea-auth-username', '');
}