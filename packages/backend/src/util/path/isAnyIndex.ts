import { Path } from "../../execution/types";

export function isAnyIndex(segment: Path[number]): segment is ['*'] {
    if (!Array.isArray(segment)) {
        return false;
    }
    return segment[0] === '*' && segment.length === 1;
}