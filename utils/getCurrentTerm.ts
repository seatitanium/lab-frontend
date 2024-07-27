import {useState} from "#app";
import {PeriodTag} from "~/consts";

export default function getCurrentTerm() {
    const termInformation = useState<Term[]>('term-information');
    return termInformation.value.filter(x => x.tag === PeriodTag)[0];
}