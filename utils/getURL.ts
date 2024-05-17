export default function(path: string) {
    return new URL(`../${path}`, import.meta.url).href;
}