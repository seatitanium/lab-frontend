export default function escapeLtGt(str: string) {
    return str.replaceAll(">", "&gt;").replaceAll("<", "&lt;");
}