import {useLocalStorage} from "@vueuse/core";

export default function getAfterRegisterNoticeConfig(){
    return useLocalStorage('tisea-after-register-notice', () => {
        return {
            mcid: false,
            ready: false
        }
    });
}