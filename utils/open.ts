export default function open(url: string, newWindow: boolean = true) {
    if (newWindow) window.open(url);
    else location.href = url;
}