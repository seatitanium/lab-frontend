import formatElapsedTime from "~/utils/formatElapsedTime";

export default function (delta: number) {
    const seconds = 1000;
    const minutes = seconds * 60;
    const hours = minutes * 60;
    const days = hours * 24;
    const months = days * 30;

    const resDays = formatElapsedTime(delta, days, false);

    return `${resDays}d`
}