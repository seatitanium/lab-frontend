import formatElapsedTime from "~/utils/formatElapsedTime";
import formatSecondsToObjectDense from "~/utils/formatSecondsToObjectDense";

export default function (delta: number) {
    const obj = formatSecondsToObjectDense(delta);

    return `${obj.h}h${obj.m}m${obj.s}s`
}