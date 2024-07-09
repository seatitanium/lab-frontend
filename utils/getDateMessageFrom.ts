import formatElapsedTime from "~/utils/formatElapsedTime";

export default function (date: Date) {
    const delta = new Date().getTime() - date.getTime();
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30;

    const resMonth = formatElapsedTime(delta, months);
    const resDays = formatElapsedTime(delta, days, false, 30);
    const resHours = formatElapsedTime(delta, hours, false, 24);
    const resMinutes = formatElapsedTime(delta, minutes, false, 60);
    const resSeconds = formatElapsedTime(delta, seconds, false, 60);

    return (resMonth === '0' ? '' : resMonth + ' 个月') + ` ${resDays} 天 ${resHours} 小时 ${resMinutes} 分钟 ${resSeconds} 秒`
}