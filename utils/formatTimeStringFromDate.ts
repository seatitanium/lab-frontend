import withLeadingZero from "~/utils/withLeadingZero";

export default function (date: Date) {
    return `${date.getFullYear()}-${withLeadingZero(date.getMonth()+1)}-${withLeadingZero(date.getDate())} ${withLeadingZero(date.getHours())}:${withLeadingZero(date.getMinutes())}:${withLeadingZero(date.getSeconds())}`;
}