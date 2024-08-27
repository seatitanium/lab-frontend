import formatElapsedTime from "~/utils/formatElapsedTime";
import formatSecondsToObjectDense from "~/utils/formatSecondsToObjectDense";

export default function formatTimeAgoFromString(date: string) {
    const ago = new Date(date);
    const now = new Date();

    const elapsed = now.getTime() - ago.getTime();

    const obj = formatSecondsToObjectDense(elapsed);

    if (obj.h === '0') {
        if (obj.m === '0') {
            return `${obj.s} 秒`;
        }
        return `${obj.m} 分钟`;
    }

    const inth = parseInt(obj.h)

    if (isNaN(inth)) return '';

    if (inth >= 24) {
        return `${Math.round(inth / 24)} 天`;
    }

    return `${obj.h} 小时`
}