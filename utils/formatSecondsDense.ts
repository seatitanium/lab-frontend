import formatElapsedTime from "~/utils/formatElapsedTime";

export default function (delta: number) {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30;

    const resHours = formatElapsedTime(delta, hours, false);
    const resMinutes = formatElapsedTime(delta, minutes, false, 60);
    const resSeconds = formatElapsedTime(delta, seconds, false, 60);

    return `${resHours}h${resMinutes}m${resSeconds}s`
}