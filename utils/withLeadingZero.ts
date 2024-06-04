export default function(str: string | number) {
    return str.toString().length > 1 ? str : '0' + str;
}