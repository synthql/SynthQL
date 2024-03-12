import { Path } from '../../execution/types';

export function printPath(path: Path): string {
    return path.join('.');
}
