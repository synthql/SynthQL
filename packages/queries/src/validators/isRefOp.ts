import { RefOp } from '../types/RefOp';

export function isRefOp(op: any): op is RefOp<any> {
    if (op === undefined || op === null) {
        return false;
    }

    if (typeof op !== 'object') {
        return false;
    }

    if (!('$ref' in op)) {
        return false;
    }

    if (typeof op.$ref !== 'object') {
        return false;
    }

    if (op.$ref.table === undefined || op.$ref.column === undefined) {
        return false;
    }

    return true;
}
