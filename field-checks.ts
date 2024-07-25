import type {Ref} from "vue";
import {GlobalRegex} from "~/consts";

export function checkPassword(newValue: string, problem: Ref<string>) {
    if (!GlobalRegex.password.test(newValue)) {
        if (!/(?=\S*?[A-Z])/.test(newValue)) {
            problem.value = "密码应至少包含一个大写字母";
        } else if (!/(?=\S*?[a-z])/.test(newValue)) {
            problem.value = "密码应至少包含一个小写字母";
        } else if (!/(?=\S*?[0-9])/.test(newValue)) {
            problem.value = "密码应至少包含一个数字";
        } else if (newValue.length < 6) {
            problem.value = "密码应至少有 6 位"
        } else if (newValue.length > 20) {
            problem.value = "密码最长支持 20 位"
        }
    } else {
        problem.value = "";
    }
}

export function checkEmail(newValue: string, problem: Ref<string>) {
    if (!GlobalRegex.email.test(newValue)) {
        problem.value = "不符合电子邮件格式";
    } else {
        problem.value = '';
    }
}

export function checkNickname(newValue: string, problem: Ref<string>) {
    if (newValue.length === 0) {
        problem.value = '';
        return;
    }

    if (!GlobalRegex.nickname.test(newValue)) {
        if (!/^[\u4E00-\u9FFFA-Za-z0-9_]+$/.test(newValue)) {
            problem.value = "只能包含汉字、英文、下划线或数字";
        } else {
            problem.value = "长度为 3~15 位"
        }
    } else {
        problem.value = '';
    }
}

export function checkMCID(newValue: string, problem: Ref<string>) {
    if (!GlobalRegex.mcid.test(newValue)) {
        if (!/^[a-zA-Z0-9_]+$/.test(newValue)) {
            problem.value = "只能包含英文、下划线或者数字"
        } else {
            problem.value = "长度为 2~16 位";
        }
    } else {
        problem.value = ''
    }
}

export function checkUsername(newValue: string, problem: Ref<string>) {
    if (!GlobalRegex.username.test(newValue)) {
        if (!/^[a-zA-Z0-9_]+$/.test(newValue)) {
            problem.value = "只能包含英文、下划线或者数字"
        } else {
            problem.value = "长度为 3~20 位";
        }
    } else {
        problem.value = ''
    }
}