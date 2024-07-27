export default function tn(tag: string) {
    return tag.startsWith("st") ? parseInt(tag.slice(2)) : 7;
}