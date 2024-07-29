import {
    mdiAlertOutline,
    mdiAlphaA,
    mdiAlphaB,
    mdiAlphaC,
    mdiAlphaD,
    mdiAlphaE,
    mdiAlphaF,
    mdiAlphaG,
    mdiAlphaH,
    mdiAlphaI,
    mdiAlphaJ,
    mdiAlphaK,
    mdiAlphaL,
    mdiAlphaM,
    mdiAlphaN,
    mdiAlphaO,
    mdiAlphaP,
    mdiAlphaQ,
    mdiAlphaR,
    mdiAlphaS,
    mdiAlphaT,
    mdiAlphaU, mdiAlphaV, mdiAlphaW, mdiAlphaX, mdiAlphaY, mdiAlphaZ,
    mdiCheck,
    mdiClockOutline,
    mdiClose,
    mdiHelpCircleOutline,
    mdiWebOff
} from "@mdi/js";

export function translateInstanceDeploymentStatus(status: DeploymentStatus) {
    switch (status) {
        case "Invalid":
            return "无效"
        case "Aborted":
            return "已停止";
        case "Success":
            return "成功";
        case "Error":
            return "出错";
        case "Timeout":
            return "超时";
        case "Cancelled":
            return "已取消"
        case "Stopping":
            return "结束中";
        case "Terminated":
            return "已中止";
        case "Scheduled":
            return "已计划";
        case "Pending":
            return "准备中";
        case "Running":
            return "部署中";
        case "Failed":
            return "失败";
        default:
            return "未知";
    }
}

export function translateInstanceStatus(status: OrEmpty<InstanceStatus>, isServerOnline: boolean) {
    switch (status) {
        case "Pending":
            return '准备中'
        case "Running":
            return isServerOnline ? '在线' : '空转';
        case "Stopping":
            return '关闭中'
        case "Stopped":
            return '离线'
        case "Starting":
            return '启动中'
        default:
            return '未知'
    }
}

export function translateInstanceStatusIcon(status: OrEmpty<InstanceStatus>, isServerOnline: boolean) {
    switch (status) {
        case "Pending":
            return mdiClockOutline;
        case "Starting":
            return 'wait';
        case "Stopping":
            return 'wait';
        case 'Stopped':
            return mdiClose;
        case 'Running':
            return isServerOnline ? mdiCheck : mdiAlertOutline;
        default:
            return '未知';
    }
}

export function translateInstanceActionName(name: OrEmpty<InstanceAction>) {
    return {
        'create': '创建并启动',
        'start': '启动',
        'reboot': '重启',
        'stop': '关闭',
        'stop_force': '强制关闭',
        'delete': '删除',
        'delete_force': '强制删除',
        '': '-'
    }[name];
}

export function translateInstantMessageStatus(status: OrEmpty<InstantMessageStatus>) {
    switch (status) {
        case "connected":
            return '已连接'
        case "error":
            return '错误';
        case "disconnected":
            return '未连接';
        case "pending":
            return '等待中'
        default:
            return '--';
    }
}

export function translateInstantMessageStatusIcon(status: OrEmpty<InstantMessageStatus>) {
    switch (status) {
        case "error":
            return mdiAlertOutline;
        case "disconnected":
            return mdiWebOff;
        case "pending":
            return mdiClockOutline;
        case "connected":
            return mdiCheck
        default:
            return mdiHelpCircleOutline;
    }
}

export function translateLetterIcon(letter: Letter) {
    switch (letter) {
        case "a":
            return mdiAlphaA
        case "b":
            return mdiAlphaB
        case "c":
            return mdiAlphaC
        case "d":
            return mdiAlphaD
        case "e":
            return mdiAlphaE
        case "f":
            return mdiAlphaF
        case "g":
            return mdiAlphaG
        case "h":
            return mdiAlphaH
        case "i":
            return mdiAlphaI
        case "j":
            return mdiAlphaJ
        case "k":
            return mdiAlphaK
        case "l":
            return mdiAlphaL
        case "m":
            return mdiAlphaM
        case "n":
            return mdiAlphaN
        case "o":
            return mdiAlphaO
        case "p":
            return mdiAlphaP
        case "q":
            return mdiAlphaQ
        case "r":
            return mdiAlphaR
        case "s":
            return mdiAlphaS
        case "t":
            return mdiAlphaT
        case "u":
            return mdiAlphaU
        case "v":
            return mdiAlphaV
        case "w":
            return mdiAlphaW
        case "x":
            return mdiAlphaX
        case "y":
            return mdiAlphaY
        case "z":
            return mdiAlphaZ

    }
}