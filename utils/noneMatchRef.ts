import type {Ref} from "vue";

export default function noneMatchRef(match: string, ...refs: Ref<string>[]) {
    for (const ref of refs) {
        if (ref.value === match) return false;
    }
    return true;
}