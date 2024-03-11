import { Path } from "../../execution/types";
import { isAnyIndex } from "./isAnyIndex";

export function printPath(path: Path): string {
    return path.map(p => isAnyIndex(p) ? '*' : p).join('.')
}