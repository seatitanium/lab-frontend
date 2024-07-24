export default function (str: string) {
    const date = new Date(str);
    return `${date.getFullYear()}-${withLeadingZero(date.getMonth() + 1)}`;
}