import withLeadingZero from "~/utils/withLeadingZero";

export default function (str: string) {
    // str can be standardized UTC+0 time.
    // new Date will turn the time to local time.
    const date = new Date(str);
    return `${date.getFullYear()}-${withLeadingZero(date.getMonth()+1)}-${withLeadingZero(date.getDate())} ${withLeadingZero(date.getHours())}:${withLeadingZero(date.getMinutes())}:${withLeadingZero(date.getSeconds())}`;
}