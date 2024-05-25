export default function formatElapsedTime(elapsedtime: number, timeunit: number, leadingZero = false, base: number = 0) {
    let time = base ? (elapsedtime / timeunit) % base : elapsedtime / timeunit;
    time = Math.floor(time);
    return time < 10 && time > 0 && leadingZero ? '0' + time : time.toString();
}