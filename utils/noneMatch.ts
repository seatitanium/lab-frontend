export default function noneMatch(match: string, ...refs: string[]) {
    for (const ref of refs) {
        if (ref === match) return false;
    }
    return true;
}