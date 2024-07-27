export default function getTermPeriod(term: Term) {
    return parseInt(formatSecondsDays((term.endAt ? new Date(term.endAt) : new Date()).getTime() - new Date(term.startAt).getTime()).substring(-1));
}