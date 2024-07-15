import escapeLtGt from "~/utils/escapeLtGt";

export default function parseColorCodes(str: string) {
    const dictionary = {
        '1': '0000AA',
        '2': '00AA00',
        '3': '00AAAA',
        '4': 'AA0000',
        '5': 'AA00AA',
        '6': 'FFAA00',
        '7': 'AAAAAA',
        '8': '555555',
        '9': '5555FF',
        '0': '000000',
        'a': '55FF55',
        'b': '55FFFF',
        'c': 'FF5555',
        'd': 'FF55FF',
        'e': 'FFFF55',
        'f': 'FFFFFF'
    } as Dict<string>;
    if (str.split("§").length === 1 && !str.startsWith("§")) return str;
    return str.split("§").map(x => {
        if (Object.keys(dictionary).includes(x.charAt(0))) {
            return `<span style="color: #${dictionary[x.charAt(0)]}">${escapeLtGt(x.substring(1, x.length))}</span>`
        } else {
            return x;
        }
    }).join("");
}